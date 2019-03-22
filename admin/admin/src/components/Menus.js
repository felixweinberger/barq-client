import React, { Component } from 'react';
import csv from 'csvtojson';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames';

import MyDropzone from './csvToJson';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    inputField: {
        display: 'flex',
        flexWrap: 'wrap',
    }
})

const convertToObject = (input) => {
    let categories = {}
    input.forEach(el => {
      if (!categories[el[2]]) categories[el[2]] = []
      categories[el[2]].push({name: el[0], price: el[1]})
    })
    return categories
}


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: {},
            json: '',
            flag: false,
            newMenuName: '',
            newMenuJSON: '',
        }
    }
//
    handleClick = event => {
        event.preventDefault();
        this.setState({flag: true})
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleThatChange = (files) => {
        this.setState({file: files[0]});
      }

    onSubmit = name => (event) => {
        event.preventDefault();
        console.log(this.state.file);
        const file = this.state.file;
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            const binaryStr = reader.result;
            csv({
            noheader:false,
            output: "csv"
            })
            .fromString(binaryStr)
            .then((csvRow)=>{
            let categoriesArr = []

            Object.entries(convertToObject(csvRow))
                .forEach(el => categoriesArr.push({name: el[0], items: el[1]}))

            this.setState({[name]: categoriesArr})
            })
        }
        reader.readAsBinaryString(file);

    }

    // onSubmit = (event) => {
    //     event.preventDefault();
    //     console.log(this.state.file);
    //     const file = this.state.file;
    //     const reader = new FileReader();
    //     reader.onabort = () => console.log('file reading was aborted');
    //     reader.onerror = () => console.log('file reading has failed');
    //     reader.onload = () => {
    //         const binaryStr = reader.result;
    //         csv({
    //         noheader:false,
    //         output: "csv"
    //         })
    //         .fromString(binaryStr)
    //         .then((csvRow)=>{
    //         let categoriesArr = []

    //         Object.entries(convertToObject(csvRow))
    //             .forEach(el => categoriesArr.push({name: el[0], items: el[1]}))

    //         this.setState({json: categoriesArr})
    //         })
    //     }
    //     reader.readAsBinaryString(file);

    // }

    // onConfirm = async (e) => {
    //     e.preventDefault();
    //     const { json } = this.state;
    //     const { name } = 
    //     const newMenu = { name: menuName, categories: json };
    //     const result = await fetch(
    //       SERVER_ADDRESS, {
    //         method: 'POST',
    //         headers: {
    //           Authorization: `Bearer ${TOKEN}`,
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(newMenu),
    //       },
    //     );
    //     console.log('Response: ', result.status); // eslint-disable-line no-console
    //   }

    onConfirm = name => event => {
        event.preventDefault();
        console.log(name);
        const { json } = this.state;
        const newMenu = {}
    }

    onDelete = name => event => {
        event.preventDefault();
        const barid = this.props.menus[0]._id;
        const idtoken = localStorage.getItem('id_token');

        fetch('http://localhost:3001/owner/bars/' + barid + '/menus/' + name, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${idtoken}`,
            },
        })
        this.props.getUser();
    }

    createMenu = event => {
        event.preventDefault();
        const barid = this.props.menus[0]._id
        const idtoken = localStorage.getItem('id_token');
        const newMenu = {
            name: this.state.newMenuName,
            categories: this.state.newMenuJSON,
        };
        fetch('http://localhost:3001/owner/bars/' + barid + '/menus', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idtoken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMenu),
        })
        this.props.getUser();
        this.setState({ newMenuName: '', newMenuJSON: '' })
    }

    ItemsList = (nodes) => {
        if (nodes) {
            return nodes.map((item, index) => (
                <div key={index}>
                    <h4>{item.name}</h4>
                    <p>Price: {`${item.price}`} EUR</p>
                </div>
            ))
        }
    }
    
    CategoriesList = (nodes) => {
        if (nodes) {
            return nodes.map((category, index) => (
                <div key={index}>
                    <h3>{category.name}</h3>
                    {this.ItemsList(category.items)}
                </div>
            ))
        }
    }


    render() {

        const { classes } = this.props;

        const { json, newMenuJSON } = this.state;

        const MenuLists = typeof this.props.menus[0] === 'object' && this.props.menus[0].menus.length > 0 ? this.props.menus[0].menus.map(menu => (
            <div key={menu._id}>
                <h2>{menu.name}</h2>
                {
                    json.length > 0 ? this.CategoriesList(json) : this.CategoriesList(menu.categories)
                }
                <form>
                    <input
                        accept="/*.csv"
                        className={classes.input}
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="file" 
                        onChange={(e) => this.handleThatChange(e.target.files)}
                    />
                    <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                        Upload
                    </Button>
                    </label> 
                    <Button 
                        type="submit" 
                        value="Submit" 
                        onClick={this.onSubmit('json')}
                    >
                        Preview
                    </Button>
                    <Button 
                        type="submit" 
                        onClick={this.onConfirm(menu._id)}
                    >
                        Confirm
                    </Button>
                    <Button 
                        type="reset"  
                        onClick={this.onDelete(menu._id)}
                    >
                        Delete Menu
                    </Button>
                </form>
                {/* {this.CategoriesList(menu.categories)} */}

            </div>
        )) : (<div><h1>You have no menus yet! Please upload your menu in csv format</h1></div>)

        return (
            <div>
                {MenuLists}
                <div>
                    <form>
                        <h1>Create new menu:</h1>
                        <TextField 
                            id="standard-name" 
                            label="Name" 
                            className={classes.textField} 
                            value={this.state.newMenuName} 
                            onChange={this.handleChange('newMenuName')} 
                            margin="normal"
                        />
                        <h4>Upload csv file</h4>
                        <input
                            accept="/*.csv"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="contained-button-file"
                            multiple
                            type="file"
                            name="file" 
                            onChange={(e) => this.handleThatChange(e.target.files)}
                        />
                        <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span" className={classes.button}>
                            Upload
                        </Button>
                        </label> 
                        <Button 
                            type="submit" 
                            value="Submit" 
                            onClick={this.onSubmit('newMenuJSON')}
                        >
                            Preview
                        </Button>
                        <Button 
                            type="submit" 
                            onClick={this.createMenu}
                        >
                            Confirm
                        </Button>
                    </form>
                    {
                        newMenuJSON.length > 0 ? this.CategoriesList(newMenuJSON) : (<div></div>)
                    }
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Menu);


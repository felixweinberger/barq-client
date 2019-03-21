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
            menu: '',
            file: {},
            json: '',
            flag: false
        }
    }

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

    onSubmit = (event) => {
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

            this.setState({json: categoriesArr})
            })
        }
        reader.readAsBinaryString(file);

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
    
    MenuList = ( {menus:nodes} ) => {
        console.log(nodes, "HERE");
        const { classes } = this.props;
        if (nodes) {
            return nodes.map(menu => (
                <div key={menu.menuId} >
                    <h2>{menu.name}</h2>
                    {this.CategoriesList(menu.categories)}
                    <div className={classes.inputField} >
                        <Button
                            variant="contained" 
                            className={classes.button} 
                            onClick={this.handleClick}
                        >
                            Update
                        </Button>
                        <form>
                            <input 
                                type="file" 
                                name="file" 
                                onChange={(e) => this.handleThatChange(e.target.files)}
                            />
                            <Button 
                                type="submit" 
                                value="Submit" 
                                onClick={this.onSubmit}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            ))
        }
    }


    render() {

        console.log(this.props.menus);

        console.log(this.state.json);

        return (
            <div>
                {this.MenuList(this.props.menus)}
                {this.state.flag && (this.CategoriesList(this.state.json)) }
            </div>
        )
    }
}

export default withStyles(styles)(Menu);


import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';

import host from '../Config/host';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
})


class Staff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            staff: [],
            name: '',
            email: '',
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    handleSubmit = event => {
        const newStaff = {
            name: this.state.name,
            email: this.state.email,
        }
        const tokenid = localStorage.getItem('id_token');
        event.preventDefault();
        fetch(`${host}/owner/bars/${this.props.match.params.barid}/staff`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenid}`,
            },
            body: JSON.stringify(newStaff)
        })
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.staff);
        console.log(this.props.barid);
        // console.log(this.props.props);

        const StaffList = this.props.staff.map(member => (
            <div key={member.staffId} >
                <h4>{member.name}</h4>
                <h4>{member.email}</h4>
            </div>
        ))


        return (
            <div>
                {StaffList}
                <form className={classes.container} noValidate autoComplete="off" >
                    <TextField 
                        id="standard-name" 
                        label="Name" 
                        className={classes.textField} 
                        value={this.state.name} 
                        onChange={this.handleChange('name')} 
                        margin="normal"
                    />
                    <TextField 
                        id="standard-email" 
                        label="Email" 
                        className={classes.textField} 
                        value={this.state.email} 
                        onChange={this.handleChange('email')} 
                        margin="normal"
                    />
                    <Button 
                        variant="contained" 
                        className={classes.button} 
                        onClick={this.handleSubmit}
                    >
                    Add
                    </Button>
                </form>
            </div>
        )

    }

}

export default withStyles(styles)(Staff);
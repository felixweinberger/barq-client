import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { mainListItems } from '../components/listitems';

import { Link } from 'react-router-dom';

import SearchBar from '../components/SearchBar';

import Staff from '../components/AddStaff';
import Menu from '../components/Menus';
import MyDropzone from '../components/csvToJson';

//import { user } from '../components/mockUser';

import Bar from '../components/Bar';

import BarList from '../components/RenderBarList';

import { Route, Switch } from 'react-router-dom';
import host from '../Config/host';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    button: {
        margin: theme.spacing.unit,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: '100vh',
      overflow: 'auto',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    tableContainer: {
      height: 320,
    },
    h5: {
      marginBottom: theme.spacing.unit * 2,
    },
  });

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            user: {
              bars: [],
            }
        };
        this.getUser = this.getUser.bind(this);
    }

    componentDidMount() {
      this.getUser();
    }

    getUser() {
      console.log(this.props.auth.isAuthenticated());
      fetch(host + '/owner', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('id_token'),
        },
    })
        .then(res => res.json())
        .then(data => {
            this.setState({ user: data });
        })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    }

    handleDrawerClose = () => {
        this.setState({ open: false });
    }

    login() {
        this.props.auth.login()
    }

    logout() {
        this.props.auth.logout();
    }

    render() {
        const { classes } = this.props
        const { isAuthenticated } = this.props.auth;

        const { bars } = this.state.user

        if (localStorage.getItem('isLoggedIn') !== 'true') {
            console.log('not authenticated')
            this.props.auth.login();
        }


        return (
            <div>
            {isAuthenticated && ( <div className={classes.root} >
                <CssBaseline />
                <AppBar 
                    position="absolute" 
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)} 
                    color="inherit" 
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                        >
                        BarQ
                        </Typography>
                        <Button 
                            variant="contained" 
                            className={classes.button} 
                            onClick={this.logout.bind(this)}
                        >
                        Log Out
                        </Button>
                        
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {/* <List>{mainListItems}</List> */}
                <Divider />
                <List>
                    <ListSubheader inset>My Bars</ListSubheader>
                    {BarList(bars)}
                    <ListItem
                        component={props => <Link to="/newbar" {...props} />}
                    >
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add New Bar" />
                    </ListItem>
                </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Switch>
                        <Route 
                            path="/newbar"
                            render={(props) => (
                                <div>
                                    <h3>Enter the name of the bar you would like to add:</h3>
                                    <SearchBar getUser={this.getUser} {...props} {...this.state} />
                                </div>
                            )}
                        />
                        <Route 
                            path="/bars/:barid"
                            render={(props) => {
                              return <Bar {...props} getUser={this.getUser} {...this.state} />
                            }}
                        />
                    </Switch>
                </main>
            </div>)}
            </div>
            
        )

    }

}

export default withStyles(styles)(Dashboard);
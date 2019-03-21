import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import MailIcon from '@material-ui/icons/Mail';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

import { Link } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListItem component={props => <Link to="/dashboard" {...props} />} button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem component={props => <Link to="/orders" {...props} />} button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem component={props => <Link to="/staff" {...props} />} button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Staff" />
    </ListItem>
    <ListItem component={props => <Link to="/menus" {...props} />} button>
      <ListItemIcon>
        <RestaurantMenuIcon />
      </ListItemIcon>
      <ListItemText primary="Menus" />
    </ListItem>
    <ListItem component={props => <Link to="/messages" {...props} />} button>
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>
  </div>
);
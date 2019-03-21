import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalBarIcon from '@material-ui/icons/LocalBar';

import { Link } from 'react-router-dom';


const BarList = (nodes) => {
    if(nodes) {
        return nodes.map(node => (
            <ListItem 
                key={node._id} 
                component={props => <Link to={`/bars/${node._id}`} {...props} />}
                button
            >
                <ListItemIcon>
                    <LocalBarIcon />
                </ListItemIcon>
                <ListItemText primary={node.name} />
            </ListItem>
        ))
    }
}

export default BarList;
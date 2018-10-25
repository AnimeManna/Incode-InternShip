import React, {Component} from 'react'

import { withStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core'

import {
    Chat
} from '@material-ui/icons'

const styles = theme => ({
    Sidebar:{
        width:'20%',
        height:400,
        backgroundColor: theme.palette.background.paper,
        borderRight:'1px solid gray'
    },
    Sidebar__Button:{
        textDecoration:'none'
    }
})

class Sidebar extends Component{
    render(){
        const {classes} = this.props
        return(
            <div className={classes.Sidebar}>
                <List component="nav">
                    <Link to='/posts' className={classes.Sidebar__Button}>
                        <ListItem button>
                            <ListItemIcon>
                                <Chat/>
                            </ListItemIcon>
                            <ListItemText inset primary="Posts"/>
                        </ListItem>
                        <Divider/>
                    </Link>
                </List>
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar)
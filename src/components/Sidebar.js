import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux'

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider
} from '@material-ui/core'

import {getCategorys} from "../actionsCreators/categoryActions";

import {changePostCategories} from "../actionsCreators/postsActions";

import {
    Chat,
    PlaylistAdd
} from '@material-ui/icons'

const styles = theme => ({
    Sidebar: {
        width: '20%',
        height: 400,
        backgroundColor: theme.palette.background.paper,
        borderRight: '1px solid gray'
    },
    Sidebar__Button: {
        textDecoration: 'none'
    }
})

class Sidebar extends Component {
    componentDidMount() {
        this.props.getCategorys()
    }

    render() {
        const {classes, categories} = this.props
        return (
            <div className={classes.Sidebar}>
                <List component="nav">
                    {categories.map((category) => {
                        return <Link to='/home' className={classes.Sidebar__Button} key={category.id}>
                            <ListItem button  onClick={() => {
                                this.props.changePostCategories(category.title)
                            }}>
                                <ListItemIcon>
                                    <Chat/>
                                </ListItemIcon>
                                <ListItemText inset primary={category.title}/>
                                <Divider/>
                            </ListItem>
                        </Link>
                    })}
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    categories: state.categoryReducer.categories
})

const mapDispatchToProps = {
    getCategorys,
    changePostCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar))
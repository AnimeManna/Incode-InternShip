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

import {getCategories, deleteCategory} from "../actionsCreators/categoryActions";

import {changePostCategories} from "../actionsCreators/postsActions";

import {
    Chat,
    Delete
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
    },
    Sidebar__ItemText: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-start'
    }
})

class Sidebar extends Component {
    componentDidMount() {
        const {
            getCategories
        } = this.props
        getCategories()
    }

    render() {
        const {
            classes,
            categories,
            deleteCategory,
            changePostCategories
        } = this.props
        return (
            <div className={classes.Sidebar}>
                <List component="nav">
                    {categories.map((category) => {
                        const {title, id} = category
                        return <Link to='/home' className={classes.Sidebar__Button} key={id}>
                            <ListItem button>
                                <div className={classes.Sidebar__ItemText} onClick={() => {
                                    changePostCategories(title)
                                }}>
                                    <ListItemIcon>
                                        <Chat/>
                                    </ListItemIcon>
                                    <ListItemText inset primary={title}/>
                                </div>
                                <ListItemIcon onClick={() => {
                                    deleteCategory(id);
                                }}>
                                    <Delete/>
                                </ListItemIcon>
                            </ListItem>
                            <Divider/>
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
    getCategories,
    changePostCategories,
    deleteCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar))
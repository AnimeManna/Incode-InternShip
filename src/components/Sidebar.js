import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import {connect} from 'react-redux'

import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Snackbar,
    CircularProgress
} from '@material-ui/core'

import {getCategories, deleteCategory} from "../actionsCreators/categoryActions";
import {closeSnackBar} from "../actionsCreators/snackBarActions";
import {changePostCategories} from "../actionsCreators/postsActions";

import {
    Chat,
    Delete,

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
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
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
            changePostCategories,
            snackBarStatus,
            closeSnackBar,
            snackBarMessage,
            getIsLoaded,
            isAuth
        } = this.props

        if(!getIsLoaded && isAuth){
            return <CircularProgress className={classes.progress}/>
        }

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
                <Snackbar
                    anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
                    open={snackBarStatus}
                    onClose={closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{snackBarMessage}</span>}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth:state.authReducer.success,
    categories: state.categoryReducer.categories,
    snackBarStatus: state.snackBarReducer.openSnackBar,
    snackBarMessage:state.snackBarReducer.message,
    getIsLoaded:state.categoryReducer.getIsLoaded
})

const mapDispatchToProps = {
    getCategories,
    changePostCategories,
    deleteCategory,
    closeSnackBar
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar))
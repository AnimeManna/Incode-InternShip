import React, {Component} from 'react'

import {withStyles} from "@material-ui/core/styles"

import {connect} from 'react-redux'

import ModalCreateNewPost from './ModalCreateNewPost'

import {openModalNewPost} from "../actionsCreators/modalNewPostActions";

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core'

import {Link} from 'react-router-dom'


import {dispatchUserID} from "../actionsCreators/accountActions";

import {getPosts} from "../actionsCreators/postsActions";

import {
    AccountCircle,
    ExitToApp,
    PermIdentity,
    Home,
    Create
} from '@material-ui/icons'

import {logOut} from "../actionsCreators/logoutActions";

const styles = theme => ({
    Header__Title: {
        flexGrow: 1
    },
    Header__Title__Button: {
        textDecoration: 'none',
        color: 'white',
    },
    Header__Button__Icon: {
        margin: 1,
        textDecoration: 'none',
        color: 'white',
        width: 50,
        height: 50
    }
})

class Header extends Component {
    render() {
        const {classes, isAuth, logOut, UserID, dispatchUserID, getPosts, openModalNewPost} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h4" color="inherit" className={classes.Header__Title}>
                            <Link to='/home' className={classes.Header__Title__Button}
                                  onClick={() => {
                                      getPosts()
                                  }}>
                                CreativeBlog
                            </Link>
                        </Typography>
                        {
                            isAuth
                                ?
                                <div>
                                    <IconButton
                                        className={classes.Header__Button__Icon}
                                        aria-haspopup="true"
                                        color='inherit'
                                        onClick={()=>{
                                            openModalNewPost();
                                        }}
                                    >
                                        <Create/>
                                    </IconButton>
                                    <ModalCreateNewPost />
                                    <Link to={`/post/author/${UserID}`} className={classes.Header__Button__Icon}
                                          onClick={() => {
                                              dispatchUserID(UserID)
                                          }}>
                                        <IconButton
                                            aria-haspopup="true"
                                            color='inherit'>
                                            <PermIdentity/>
                                        </IconButton>
                                    </Link>
                                    <Link to='/home' className={classes.Header__Button__Icon}>
                                        <IconButton
                                            onClick={() => {
                                                getPosts()
                                            }}
                                            aria-haspopup="true"
                                            color='inherit'>
                                            <Home/>
                                        </IconButton>
                                    </Link>
                                    <Link to='/' className={classes.Header__Button__Icon}>
                                        <IconButton
                                            aria-haspopup="true"
                                            className={classes.Header__Button__Icon}
                                            color='inherit'
                                            onClick={logOut}>
                                            <ExitToApp/>
                                        </IconButton>
                                    </Link>
                                </div>
                                :
                                <IconButton
                                    aria-haspopup="true"
                                    className={classes.Header__Button__Icon}
                                    color='inherit'
                                >
                                    <AccountCircle/>
                                </IconButton>
                        }
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.success,
    UserID: state.authReducer.user.id
})

const mapDispatchToProps = {
    logOut,
    getPosts,
    dispatchUserID,
    openModalNewPost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header))
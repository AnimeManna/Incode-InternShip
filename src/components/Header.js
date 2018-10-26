import React, {Component} from 'react'

import {withStyles} from "@material-ui/core/styles"

import {connect} from 'react-redux'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
} from '@material-ui/core'

import {Link} from 'react-router-dom'

import AvatarUser from './AvatarUser'

import {getPosts} from "../actionsCreators/postsActions";

import {
    AccountCircle,
    ExitToApp,
    PermIdentity,
    Home
} from '@material-ui/icons'

import {logOut} from "../actionsCreators/logoutActions";

const styles = theme => ({
    Header__Title: {
        flexGrow: 1
    },
    Header__Title__Button:{
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
        const {classes, isAuth, logOut} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h4" color="inherit" className={classes.Header__Title}>
                            <Link to='/home' className={classes.Header__Title__Button}>
                                CreativeBlog
                            </Link>
                        </Typography>
                        {
                            isAuth
                                ?
                                <div>
                                    <Link to='/newPost' className={classes.Header__Button__Icon}>
                                        <IconButton
                                            aria-haspopup="true"
                                            color='inherit'>
                                            <PermIdentity/>
                                        </IconButton>
                                    </Link>
                                    <Link to='/home' className={classes.Header__Button__Icon}>
                                        <IconButton
                                            onClick={()=>{
                                                this.props.getPosts()
                                            }}
                                            aria-haspopup="true"
                                            color='inherit'>
                                            <Home/>
                                        </IconButton>
                                    </Link>
                                    <IconButton
                                        aria-haspopup="true"
                                        className={classes.Header__Button__Icon}
                                        color='inherit'
                                        onClick={logOut}>
                                        <ExitToApp/>
                                    </IconButton>
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
    isAuth: state.authReducer.success
})

const mapDispathToProps = {
    logOut,
    getPosts
}

export default connect(mapStateToProps, mapDispathToProps)(withStyles(styles)(Header))
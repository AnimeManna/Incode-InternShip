import React, {Component} from 'react'

import {withStyles} from "@material-ui/core/styles"

import {connect} from 'react-redux'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography
} from '@material-ui/core'

import {Link} from 'react-router-dom'

import {
    AccountCircle,
    ExitToApp,
    Create
} from '@material-ui/icons'

import {logOut} from "../actionsCreators/logoutActions";

const styles = theme => ({
    Header__Button__Title: {
        textDecoration: 'none',
        color:'white',
        flexGrow:1
    },
    Header__Button__Icon:{
        margin:1,
        textDecoration: 'none',
        color:'white',
        width:50,
        height:50
    }
})

class Header extends Component {
    render() {
        const {classes, isAuth, logOut} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Link to='/home' className={classes.Header__Button__Title} >
                            <Typography variant="h4" color="inherit">CreativeBlog</Typography>
                        </Link>
                        {
                            isAuth
                                ?
                                <div>
                                    <Link to='/newPost' className={classes.Header__Button__Icon}>
                                        <IconButton
                                            aria-haspopup="true"
                                            color='inherit'>
                                            <Create/>
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
    logOut
}

export default connect(mapStateToProps, mapDispathToProps)(withStyles(styles)(Header))
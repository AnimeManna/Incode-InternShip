import React, { Component } from 'react';


import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

import { getUser } from "../actionsCreators/authActions";

import {withStyles} from '@material-ui/core/styles'

import { connect } from 'react-redux'

import Login from '../components/Login'
import Register from '../components/Register'
import Layout from './Layout'
import Posts from '../components/Posts'
import UpdatePost from '../components/UpdatePost'
import Post from '../components/Post'
import Account from '../components/Account'

const styles = theme => ({
    App:{
        width:'80%',
        backgroundColor: theme.palette.background.paper
    }
})

class App extends Component{


    componentDidMount(){
        this.props.getUser(this.props.history);
    }

    render(){
        const {classes,isAuth} = this.props;
        return(
            <div className={classes.App}>
                <Switch>
                    <Route exact path='/' component = {Layout}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' render={ ()=>(
                        isAuth ? (
                            <Posts />
                        ):(
                            <Redirect to="/"/>
                        )

                    )} />
                    <Route path='/updatePost' render={ ()=>(
                        isAuth ? (
                            <UpdatePost />
                        ):(
                            <Redirect to="/"/>
                        )

                    )} />
                    <Route path='/posts' component={Posts} />
                    <Route path='/post/author/:id' component={Account} />
                    <Route path='/post/:id' component={Post} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth:state.authReducer.success,
    user:state.authReducer.user
})

const mapDispatchToProps = {
    getUser
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(App)))

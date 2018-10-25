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
import Home from '../components/Home'
import CreateNewPost from '../components/CreateNewPost'

const styles = theme => ({
    App:{
        marginTop:100,
        width:'70%',
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
                            <Home />
                        ):(
                            <Redirect to="/"/>
                        )

                    )} />
                    <Route path='/newPost' render={ ()=>(
                        isAuth ? (
                            <CreateNewPost />
                        ):(
                            <Redirect to="/"/>
                        )

                    )} />
                    <Route path='/:other' render={()=>(
                        <Redirect to='/'/>
                    )} />
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

import React, { Component } from 'react';
import './App.css';


import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

import { getUser } from "../actionsCreators/authActions";

import { connect } from 'react-redux'

import Login from '../components/Login'
import Register from '../components/Register'
import Layout from './Layout'
import Home from '../components/Home'

class App extends Component{


    componentDidMount(){
        this.props.getUser(this.props.history);
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component = {Layout}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' render={ ()=>(
                        this.props.isAuth ? (
                            <Home />
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

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))

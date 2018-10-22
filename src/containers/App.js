import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

import {Route, Switch} from 'react-router-dom'

import Login from '../components/Login'
import Register from '../components/Register'
import Layout from './Layout'

class App extends Component{

    constructor(props){
        super(props);
        this.sendToken=this.sendToken.bind(this);
    }

    async sendToken(){
        let config = {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        await axios.get('http://localhost:8000/userme',config)
    }

    componentDidMount(){
        this.sendToken();
    }

    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' component={Layout} />
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </div>
        )
    }
}

export default App

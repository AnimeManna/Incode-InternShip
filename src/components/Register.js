import React, {Component} from 'react'

import './Register.css'

import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'

import {sendDataRegister} from "../actionsCreators/registerActions";
import {changeInput} from "../actionsCreators/InputActions";




import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:{
                isValid:false,
                text:''
            },
            login:{
                isValid:false,
                text:''
            },
            isValid: false,
            isChanged: false
        }
        this.changeInputPassword = this.changeInputPassword.bind(this);
        this.changeInputLogin = this.changeInputLogin.bind(this);
        this.checkValidStatus = this.checkValidStatus.bind(this)
    }

    changeInputPassword(event){
       const {value} = event.target
        const valueLength = value.length
        if(valueLength > 2 && valueLength <15){
            this.setState({
                password:{
                    isValid:true,
                    text:value
                }
            })
        }else{
            this.setState({
                password:{
                    isValid:false,
                    text:''
                }
            })
        }
        this.checkValidStatus()
    }
    changeInputLogin(event){
        const {value} = event.target
        const valueLength = value.length
        if(valueLength > 2 && valueLength <15){
            this.setState({
                login:{
                    isValid:true,
                    text:value
                }
            })
        }else{
            this.setState({
                login:{
                    isValid:false,
                    text:''
                }
            })
        }
        this.checkValidStatus()
    }

    checkValidStatus(){
        const {password, login} = this.state
        if(password.isValid && login.isValid){
            this.setState({
                isValid:true
            })
        }else{
            this.setState({
                isValid:false
            })
        }
        this.props.changeInput('REGISTER',this.state.isValid)
    }

    render() {
        if(this.props.token){
            return <Redirect to="/home" />
        }
        return (
            <div className="Register">
                <Paper className="Register__paper">
                    <Typography variant="h3">
                        Tell me your story
                    </Typography>
                    <div className="Register__inputs">
                        <TextField
                            required
                            label="Login"
                            name="login"
                            className="Register__input"
                            onChange={this.changeInputLogin}
                            error={this.state.login.isValid}
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            className="Register__input"
                            onChange={this.changeInputPassword}
                            error={this.state.password.isValid}
                        />
                    </div>
                        <Button disabled={!this.props.isValid} variant="contained" color="primary" onClick={() => {
                            this.props.sendDataRegister({login:this.state.login.text, password:this.state.password.text})
                        }}>
                            Register
                        </Button>
                </Paper>
            </div>
        )
    }
}

const mapDispatchToProps = {
    sendDataRegister,
    changeInput
};

const mapStateToProps = (state) => ({
    token: state.registerReducer.user.token,
    isValid: state.registerReducer.isValid
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)
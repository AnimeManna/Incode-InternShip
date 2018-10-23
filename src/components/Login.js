import React, {Component} from 'react'

import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

import {connect} from 'react-redux'

import {Redirect} from 'react-router-dom'

import {sendDataLogin} from "../actionsCreators/loginActions";
import {changeInput} from "../actionsCreators/InputActions";

import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: {
                isValid: false,
                text: ''
            },
            login: {
                isValid: false,
                text: ''
            },
            errorMessage: ''
        }
        this.changeInputPassword = this.changeInputPassword.bind(this);
        this.changeInputLogin = this.changeInputLogin.bind(this);
        this.checkValidStatus = this.checkValidStatus.bind(this);
    }

    changeInputPassword(event) {
        const {value} = event.target
        const valueLength = value.length
        if (valueLength > 2 && valueLength < 15) {
            this.setState({
                password: {
                    isValid: true,
                    text: value
                }
            })
        } else {
            this.setState({
                password: {
                    isValid: false,
                    text: value
                }
            })
        }
        Promise.resolve(true)
            .then(() => {
                this.checkValidStatus()
            });
    }

    isValid(value) {
        return value.length < 15 && value.length > 2;
    }

    changeInputLogin(event) {
        const {value} = event.target
        const valueLength = value.length
        if (valueLength > 2 && valueLength < 15) {
            this.setState({
                login: {
                    isValid: true,
                    text: value
                }
            })
        } else {
            this.setState({
                login: {
                    isValid: false,
                    text: ''
                }
            })
        }
        Promise.resolve(true)
            .then(() => {
                this.checkValidStatus()
            });
    }


    checkValidStatus() {
        const {password, login} = this.state;
        if (password.isValid && login.isValid) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }
        this.props.changeInput('LOGIN', this.state.isValid)
    }



    render() {
        if(this.props.token){
            return <Redirect to="/home" />
        }
        return (<div className="Login">
                <Paper className="Login__paper">
                    <Typography variant="h3" className="Login__text">
                        Please tell me who are you?
                    </Typography>
                    <div className="Login__inputs">
                        <TextField
                            required
                            label="Login"
                            className="Login__input"
                            name="login"
                            onChange={this.changeInputLogin}
                            error={!this.state.login.isValid && this.props.hasChanges}
                        />
                        <TextField
                            required
                            onChange={this.changeInputPassword}
                            label="Password"
                            type="password"
                            name="password"
                            className="Login__input"
                            error={!this.state.password.isValid  && this.props.hasChanges}
                        />
                    </div>
                    <Button disabled={!this.props.isValid} variant="contained" color="primary" onClick={() => {
                        this.props.sendDataLogin({login: this.state.login.text, password: this.state.password.text});
                    }}>
                        Login
                    </Button>
                    <Typography>{this.props.errorMessage}</Typography>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.loginReducer.user.token,
    isValid: state.loginReducer.isValid,
    authStatus: state.loginReducer.user.success,
    hasChanges: state.loginReducer.hasChanges,
    errorMessage: state.loginReducer.user.msg
});

const mapDispatchToProps = {
    sendDataLogin,
    changeInput
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
import React, {PureComponent} from 'react'

import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'


import {sendDataLogin} from "../actionsCreators/loginActions";
import {
    inputValid,
    inputChanged
} from "../actionsCreators/InputActions";

import './Login.css'

class Login extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password: {
                isValid: true,
                isChanged: false,
                text: ''
            },
            login: {
                isValid: true,
                isChanged: false,
                text: ''
            },
            isValid: false,
            isChanged: false
        }
        this.changeInputPassword = this.changeInputPassword.bind(this);
        this.changeInputLogin = this.changeInputLogin.bind(this);
        this.checkValidStatus = this.checkValidStatus.bind(this);
        this.checkChangedStatus = this.checkChangedStatus.bind(this)
        this.checkingInputChange = this.checkingInputChange.bind(this);
        this.checkingInputValid = this.checkingInputValid.bind(this)
    }

    isValid(value) {
        return value.length < 15 && value.length > 2;
    }

    isChanged(value) {
        return value.length > 0
    }

    changeInputPassword(event) {
        const {value, name} = event.target
        this.checkingInputValid(name, value)
    }

    checkingInputValid(nameInput, valueInput) {
        if (this.isValid(valueInput)) {
            this.setState({
                [nameInput]: {
                    isChanged: [nameInput].isChanged,
                    isValid: true,
                    text: valueInput
                }
            }, () => {
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput);
            })
        } else {
            this.setState({
                [nameInput]: {
                    isChanged: [nameInput].isChanged,
                    isValid: false,
                    text: valueInput
                }
            }, () => {
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput);
            })
        }
    }

    checkingInputChange(nameInput, valueInput) {
        if (this.isChanged(valueInput)) {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: true
                }
            }, () => {
                this.checkChangedStatus()
            })
        } else {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: false
                }
            }, () => {
                this.checkChangedStatus()
            })
        }
    }

    changeInputLogin(event) {
        const {value, name} = event.target
        this.checkingInputValid(name, value)
    }

    checkChangedStatus() {
        const {inputChanged} = this.props
        const {password, login, isChanged} = this.state
        if (password.isChanged && login.isChanged) {
            this.setState({
                isChanged: true
            }, () => {
                inputChanged('LOGIN', isChanged)
            })
        } else {
            this.setState({
                isChanged: false
            }, () => {
                inputChanged('LOGIN', isChanged)
            })
        }
    }


    checkValidStatus() {
        const {inputValid} = this.props
        const {password, login} = this.state;
        if (password.isValid && login.isValid) {
            this.setState({
                isValid: true
            }, () => {
                inputValid('LOGIN', this.state.isValid)
            })
        } else {
            this.setState({
                isValid: false
            }, () => {
                inputValid('LOGIN', this.state.isValid)
            })
        }
    }


    render() {
        const {login, password} = this.state
        const {isValid, isChanged, sendDataLogin, history, errorMessage} = this.props
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
                            error={!login.isValid}
                        />
                        <TextField
                            required
                            onChange={this.changeInputPassword}
                            label="Password"
                            type="password"
                            name="password"
                            className="Login__input"
                            error={!password.isValid}
                        />
                    </div>
                    <Button disabled={!isValid || !isChanged} variant="contained" color="primary"
                            onClick={() => {
                                sendDataLogin({
                                    login: login.text,
                                    password: password.text
                                }, history);
                            }}>
                        Login
                    </Button>
                    <Typography className="Login__Link">New user? <Link to='/register'>Go register</Link></Typography>
                    <Typography className="Login__text">{errorMessage}</Typography>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isValid: state.loginReducer.isValid,
    hasChanges: state.loginReducer.hasChanges,
    errorMessage: state.loginReducer.errorMessage,
    isChanged: state.loginReducer.isChanged,
});

const mapDispatchToProps = {
    sendDataLogin,
    inputValid,
    inputChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
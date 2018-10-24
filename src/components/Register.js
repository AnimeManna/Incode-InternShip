import React, {PureComponent} from 'react'

import './Register.css'

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {sendDataRegister} from "../actionsCreators/registerActions";
import {
    inputValid,
    inputChanged
} from "../actionsCreators/InputActions";


import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

class Register extends PureComponent {

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
                inputChanged('REGISTER', isChanged)
            })
        } else {
            this.setState({
                isChanged: false
            }, () => {
                inputChanged('REGISTER', isChanged)
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
                inputValid('REGISTER', this.state.isValid)
            })
        } else {
            this.setState({
                isValid: false
            }, () => {
                inputValid('REGISTER', this.state.isValid)
            })
        }
    }

    render() {
        const {isValid, isChanged, errorMessage, sendDataRegister, history} = this.props
        const {login, password} = this.state
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
                            error={!login.isValid}
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            className="Register__input"
                            onChange={this.changeInputPassword}
                            error={!password.isValid}
                        />
                    </div>
                    <Button disabled={!isValid || !isChanged} variant="contained" color="primary" onClick={() => {
                        sendDataRegister({
                            login: login.text,
                            password: password.text
                        }, history)
                    }}>
                        Register
                    </Button>
                    <Typography className="Register__Link">Have account? <Link to="/login">Go login</Link></Typography>
                    <Typography className="Register__text">{errorMessage}</Typography>
                </Paper>
            </div>
        )
    }
}

const mapDispatchToProps = {
    sendDataRegister,
    inputValid,
    inputChanged
};

const mapStateToProps = (state) => ({
    isValid: state.registerReducer.isValid,
    errorMessage: state.registerReducer.user.msg,
    isChanged: state.registerReducer.isChanged
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)
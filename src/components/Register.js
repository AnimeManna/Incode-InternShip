import React, {PureComponent} from 'react'


import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'

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
    Button,
    CircularProgress
} from "@material-ui/core"


const styles = theme => ({
    Register:{
        display:'flex',
        justifyContent:'center',
        height:400
    },
    Register__Paper:{
        display:'flex',
        padding:50,
        justifyContent: 'center',
        flexWrap:'wrap',
        width:'100%'
    },
    Register__Inputs:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap'
    },
    Register__Input:{
        width:'100%'
    },
    Register__Link:{
        width:'100%',
        textAlign:'center',
        padding:10
    },
    Register__Text:{
        width:'100%',
        textAlign: 'center'
    }
})

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
        const {isValid, isChanged,isLoaded,  sendDataRegister, history, classes} = this.props
        const {login, password} = this.state
        return (
            <div className={classes.Register}>
                <Paper className={classes.Register__Paper}>
                    <Typography variant="h3" className={classes.Register__Text}>
                        Tell me your story
                    </Typography>
                    <div className={classes.Register__Inputs}>
                        <TextField
                            required
                            label="Login"
                            name="login"
                            className={classes.Register__Input}
                            onChange={this.changeInputLogin}
                            error={!login.isValid}
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            className={classes.Register__Input}
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
                    <Typography className={classes.Register__Link}>Have account? <Link to="/login">Go login</Link></Typography>
                    {isLoaded
                    ?null
                    :<CircularProgress/>}
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
    isChanged: state.registerReducer.isChanged,
    isLoaded:state.registerReducer.isLoaded
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Register))
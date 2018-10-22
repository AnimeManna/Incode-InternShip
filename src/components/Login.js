import React, {Component} from 'react'

import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

import {connect} from 'react-redux'

import {sendDataLogin} from "../actions/loginActions";

import './Login.css'

class Login extends Component{

    constructor(props) {
        super(props);
        this.state={
                login:'',
                password:''
        }
        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(event){
        const {value,name} = event.target;
        this.setState({
                ...this.state,
                [name]:value
        })
    }


    render(){
        console.log(this.state);
        console.log(this.props.token);
        return(<div className="Register">
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
                            onChange={this.changeInput}
                        />
                        <TextField
                            required
                            onChange={this.changeInput}
                            label="Password"
                            type="password"
                            name="password"
                            className="Login__input"
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={()=>{
                        this.props.sendDataLogin({...this.state})
                    }}>
                        Login
                    </Button>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    token:state.loginReducer.user.token
})

const mapDispatchToProps = {
        sendDataLogin
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
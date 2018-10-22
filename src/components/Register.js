import React, {Component} from 'react'

import './Register.css'

import {connect} from 'react-redux'

import {sendDataRegister} from "../actions/registerActions";

import {
    Paper,
    TextField,
    Typography,
    Button
} from "@material-ui/core"

class Register extends Component {

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

    render() {
        console.log(this.props.token);
        console.log(this.state);
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
                            onChange={this.changeInput}
                        />
                        <TextField
                            required
                            name="password"
                            label="Password"
                            type="password"
                            className="Register__input"
                            onChange={this.changeInput}
                        />
                    </div>
                    <Button variant="contained" color="primary" onClick={()=>{
                        this.props.sendDataRegister({...this.state})
                    }}>
                        Register
                    </Button>
                </Paper>
            </div>
        )
    }
}

const mapDispatchToProps = {
    sendDataRegister
}

const mapStateToProps = (state) => ({
    token:state.registerReducer.user.token
})


export default connect(mapStateToProps,mapDispatchToProps)(Register)
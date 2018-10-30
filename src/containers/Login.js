import React, { PureComponent } from 'react';

import {
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import { sendDataLogin } from '../actionsCreators/loginActions';
import {
  inputValid,
  inputChanged,
} from '../actionsCreators/InputActions';


const styles = theme => ({
  Login: {
    display: 'flex',
    justifyContent: 'center',
    height: 400,
  },
  Login__Paper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 50,
    width: '100%',
  },
  Login__Inputs: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  Login__Input: {
    width: '100%',
  },
  Login__Text: {
    width: '100%',
    textAlign: 'center',
  },
  Login__Link: {
    width: '100%',
    textAlign: 'center',
    padding: 10,
  },
});

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: {
        isValid: true,
        isChanged: false,
        text: '',
      },
      login: {
        isValid: true,
        isChanged: false,
        text: '',
      },
      isValid: false,
      isChanged: false,
    };
    this.changeInputPassword = this.changeInputPassword.bind(this);
    this.changeInputLogin = this.changeInputLogin.bind(this);
    this.checkValidStatus = this.checkValidStatus.bind(this);
    this.checkChangedStatus = this.checkChangedStatus.bind(this);
    this.checkingInputChange = this.checkingInputChange.bind(this);
    this.checkingInputValid = this.checkingInputValid.bind(this);
  }

  isValid(value) {
    return value.length < 15 && value.length > 2;
  }

  isChanged(value) {
    return value.length > 0;
  }

  changeInputPassword(event) {
    const { value, name } = event.target;
    this.checkingInputValid(name, value);
  }

  checkingInputValid(nameInput, valueInput) {
    if (this.isValid(valueInput)) {
      this.setState({
        [nameInput]: {
          isChanged: [nameInput].isChanged,
          isValid: true,
          text: valueInput,
        },
      }, () => {
        this.checkValidStatus();
        this.checkingInputChange(nameInput, valueInput);
      });
    } else {
      this.setState({
        [nameInput]: {
          isChanged: [nameInput].isChanged,
          isValid: false,
          text: valueInput,
        },
      }, () => {
        this.checkValidStatus();
        this.checkingInputChange(nameInput, valueInput);
      });
    }
  }

  checkingInputChange(nameInput, valueInput) {
    if (this.isChanged(valueInput)) {
      this.setState({
        [nameInput]: {
          ...this.state[nameInput],
          isChanged: true,
        },
      }, () => {
        this.checkChangedStatus();
      });
    } else {
      this.setState({
        [nameInput]: {
          ...this.state[nameInput],
          isChanged: false,
        },
      }, () => {
        this.checkChangedStatus();
      });
    }
  }

  changeInputLogin(event) {
    const { value, name } = event.target;
    this.checkingInputValid(name, value);
  }

  checkChangedStatus() {
    const { inputChanged } = this.props;
    const { password, login, isChanged } = this.state;
    if (password.isChanged && login.isChanged) {
      this.setState({
        isChanged: true,
      }, () => {
        inputChanged('LOGIN', isChanged);
      });
    } else {
      this.setState({
        isChanged: false,
      }, () => {
        inputChanged('LOGIN', isChanged);
      });
    }
  }


  checkValidStatus() {
    const { inputValid } = this.props;
    const { password, login } = this.state;
    if (password.isValid && login.isValid) {
      this.setState({
        isValid: true,
      }, () => {
        inputValid('LOGIN', this.state.isValid);
      });
    } else {
      this.setState({
        isValid: false,
      }, () => {
        inputValid('LOGIN', this.state.isValid);
      });
    }
  }


  render() {
    const { login, password } = this.state;
    const {
      isValid, isChanged, sendDataLogin, history, isLoaded, classes,
    } = this.props;
    return (<div className={classes.Login}>
      <Paper className={classes.Login__Paper}>
        <Typography variant="h3" className={classes.Login__Text}>
                        Please tell me who are you?
        </Typography>
        <div className={classes.Login__Inputs}>
          <TextField
            required
            label="Login"
            className={classes.Login__Input}
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
            className={classes.Login__Input}
            error={!password.isValid}
          />
        </div>
        <Button
          disabled={!isValid || !isChanged}
          variant="contained"
          color="primary"
          onClick={() => {
            sendDataLogin({
              login: login.text,
              password: password.text,
            }, history);
          }}
        >
                        Login
        </Button>
        <Typography className={classes.Login__Link}>
New user?
          <Link to="/register">Go register</Link>
        </Typography>
        {isLoaded
          ? null
          : <CircularProgress />}
      </Paper>
            </div>
    );
  }
}

const mapStateToProps = state => ({
  isValid: state.loginReducer.isValid,
  hasChanges: state.loginReducer.hasChanges,
  errorMessage: state.loginReducer.errorMessage,
  isChanged: state.loginReducer.isChanged,
  isLoaded: state.loginReducer.isLoaded,
});

const mapDispatchToProps = {
  sendDataLogin,
  inputValid,
  inputChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

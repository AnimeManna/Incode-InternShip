import React, { PureComponent } from 'react';

import {
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';


import { sendDataLogin } from '../actionsCreators/loginActions';
import {
  inputValid,
  inputChanged,
} from '../actionsCreators/InputActions';


const styles = () => ({
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
  static isValid(value) {
    return value.length < 15 && value.length > 2;
  }

  static isChanged(value) {
    return value.length > 0;
  }

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


  changeInputPassword(event) {
    const { value, name } = event.target;
    this.checkingInputValid(name, value);
  }

  checkingInputValid(nameInput, valueInput) {
    if (Login.isValid(valueInput)) {
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
    const { state } = this;
    if (Login.isChanged(valueInput)) {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          isChanged: true,
        },
      }, () => {
        this.checkChangedStatus();
      });
    } else {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
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
    const { onInputChanged } = this.props;
    const { password, login, isChanged } = this.state;
    if (password.isChanged && login.isChanged) {
      this.setState({
        isChanged: true,
      }, () => {
        onInputChanged('LOGIN', isChanged);
      });
    } else {
      this.setState({
        isChanged: false,
      }, () => {
        onInputChanged('LOGIN', isChanged);
      });
    }
  }


  checkValidStatus() {
    const { onInputValid } = this.props;
    const { password, login } = this.state;
    if (password.isValid && login.isValid) {
      this.setState({
        isValid: true,
      }, () => {
        const { isValid } = this.state;
        onInputValid('LOGIN', isValid);
      });
    } else {
      this.setState({
        isValid: false,
      }, () => {
        const { isValid } = this.state;
        onInputValid('LOGIN', isValid);
      });
    }
  }


  render() {
    const { login, password } = this.state;
    const {
      isValid, isChanged, onSendDataLogin, history, isLoaded, classes,
    } = this.props;
    return (
      <div className={classes.Login}>
        <Paper className={classes.Login__Paper}>
          <Typography variant="display2" className={classes.Login__Text}>
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
              onSendDataLogin({
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

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  isValid: PropTypes.bool.isRequired,
  isChanged: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onSendDataLogin: PropTypes.func.isRequired,
  onInputValid: PropTypes.func.isRequired,
  onInputChanged: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    Login__Text: PropTypes.string.isRequired,
    Login__Link: PropTypes.string.isRequired,
    Login__Inputs: PropTypes.string.isRequired,
    Login__Input: PropTypes.string.isRequired,
    Login__Paper: PropTypes.string.isRequired,
    Login: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  isValid: state.loginReducer.isValid,
  isChanged: state.loginReducer.isChanged,
  isLoaded: state.loginReducer.isLoaded,
});

const mapDispatchToProps = {
  onSendDataLogin: sendDataLogin,
  onInputValid: inputValid,
  onInputChanged: inputChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));

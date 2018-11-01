import React from 'react';

import { withStyles } from '@material-ui/core/styles';


import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  AccountCircle,
  ExitToApp,
  PermIdentity,
  Home,
  Create,
} from '@material-ui/icons';

const styles = () => ({
  Header__Title: {
    flexGrow: 1,
  },
  Header__Title__Button: {
    textDecoration: 'none',
    color: 'white',
  },
  Header__Button__Icon: {
    margin: 1,
    textDecoration: 'none',
    color: 'white',
    width: 50,
    height: 50,
  },
});

const Header = (props) => {
  const {
    classes, isAuth, onLogOut, UserID, onDispatchUserID, onGetPosts, onOpenModalNewPost,
  } = props;
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="display1" color="inherit" className={classes.Header__Title}>
            <Link
              to="/home"
              className={classes.Header__Title__Button}
              onClick={() => {
                onGetPosts();
              }}
            >
              CreativeBlog
            </Link>
          </Typography>
          {
            isAuth
              ? (
                <div>
                  <IconButton
                    className={classes.Header__Button__Icon}
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => {
                      onOpenModalNewPost();
                    }}
                  >
                    <Create />
                  </IconButton>
                  <Link
                    to={`/post/author/${UserID}`}
                    className={classes.Header__Button__Icon}
                    onClick={() => {
                      onDispatchUserID(UserID);
                    }}
                  >
                    <IconButton
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <PermIdentity />
                    </IconButton>
                  </Link>
                  <Link to="/home" className={classes.Header__Button__Icon}>
                    <IconButton
                      onClick={() => {
                        onGetPosts();
                      }}
                      aria-haspopup="true"
                      color="inherit"
                    >
                      <Home />
                    </IconButton>
                  </Link>
                  <Link to="/" className={classes.Header__Button__Icon}>
                    <IconButton
                      aria-haspopup="true"
                      className={classes.Header__Button__Icon}
                      color="inherit"
                      onClick={onLogOut}
                    >
                      <ExitToApp />
                    </IconButton>
                  </Link>
                </div>
              )
              : (
                <IconButton
                  aria-haspopup="true"
                  className={classes.Header__Button__Icon}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  UserID: PropTypes.string.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onGetPosts: PropTypes.func.isRequired,
  onDispatchUserID: PropTypes.func.isRequired,
  onOpenModalNewPost: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    Header__Button__Icon: PropTypes.string.isRequired,
    Header__Title__Button: PropTypes.string.isRequired,
    Header__Title: PropTypes.string.isRequired,
  }).isRequired,
};


export default (withStyles(styles)(Header));

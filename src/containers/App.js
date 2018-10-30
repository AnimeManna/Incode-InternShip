import React from 'react';

import PropTypes from 'prop-types';

import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';


import { withStyles } from '@material-ui/core/styles';


import Login from './Login';
import Register from './Register';
import Layout from './Layout';
import Posts from '../components/Posts';
import UpdatePost from '../components/UpdatePost';
import Post from '../components/Post';
import Account from '../components/Account';

const styles = theme => ({
  App: {
    width: '80%',
    backgroundColor: theme.palette.background.paper,
  },
});

const App = (props) => {
  const {
    classes,
    isAuth,
  } = props;
  return (
    <div className={classes.App}>
      <Switch>
        <Route exact path="/" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route
          path="/home"
          render={() => (
            isAuth ? (
              <Posts />
            ) : (
              <Redirect to="/" />
            )

          )}
        />
        <Route
          path="/updatePost"
          render={() => (
            isAuth ? (
              <UpdatePost />
            ) : (
              <Redirect to="/" />
            )

          )}
        />
        <Route path="/posts" component={Posts} />
        <Route path="/post/author/:id" component={Account} />
        <Route path="/post/:id" component={Post} />
        <Route
          path="/:other"
          render={() => (
            isAuth ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/" />
            )
          )}
        />
      </Switch>
    </div>
  );
};

App.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    App: PropTypes.string.isRequired,
  }).isRequired,
};


export default (withStyles(styles)(App));

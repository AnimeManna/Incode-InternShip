import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Paper,
  Button,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  Layout: {
    display: 'flex',
    justifyContent: 'center',
  },
  Layout__Paper: {
    width: '100%',
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  Layout__Title: {
    textAlign: 'center',
  },
  Layout__Buttons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  Layout__Button: {
    textDecoration: 'none',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Layout extends Component {
  render() {
    const { classes, isLoaded } = this.props;

    if (!isLoaded) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div className={classes.Layout}>
        <Paper className={classes.Layout__Paper}>
          <Typography className={classes.Layout__Title} variant="h3">
                        Hello, are we familiar or are you not yet?
          </Typography>
          <div className={classes.Layout__Buttons}>
            <Link to="/login" className={classes.Layout__Button}>
              <Button variant="contained" color="primary">Are familiar</Button>
            </Link>
            <Link to="/register" className={classes.Layout__Button}>
              <Button variant="contained" color="primary">Not yet</Button>
            </Link>
          </div>
        </Paper>
      </div>
    );
  }
}

Layout.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    Layout: PropTypes.string.isRequired,
    Layout__Button: PropTypes.string.isRequired,
    Layout__Paper: PropTypes.string.isRequired,
    Layout__Title: PropTypes.string.isRequired,
    Layout__Buttons: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  isLoaded: state.authReducer.isLoaded,
});

export default connect(mapStateToProps)(withStyles(styles)(Layout));

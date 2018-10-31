import React, { Component } from 'react';


import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


import {
  Avatar,
} from '@material-ui/core';

const styles = () => ({
  avatar: {
    width: 60,
    height: 60,
    border: '4px,solid,gray',
    borderRadius: '50%',
    margin: 4,
  },

});

class AvatarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLetter: '',
      lastLetter: '',
    };
    this.getLetter = this.getLetter.bind(this);
  }


  componentDidMount() {
    this.getLetter();
  }

  getLetter() {
    const { login } = this.props;
    const firstLetter = login.charAt(0);
    const numberLastLetter = login.length - 1;
    const lastLetter = login.charAt(numberLastLetter);
    this.setState({
      firstLetter,
      lastLetter,
    });
  }


  createColorFirst() {
    const { firstLetter } = this.state;
    return firstLetter.charCodeAt();
  }


  createColorLast() {
    const { lastLetter } = this.state;
    return lastLetter.charCodeAt();
  }


  render() {
    const { classes } = this.props;
    const { firstLetter, lastLetter } = this.state;
    return (
      <div>
        <Avatar className={classes.avatar} size="normal" style={{ backgroundColor: `rgb(${this.createColorFirst()},50,${this.createColorLast()})` }}>
          {firstLetter}
          {lastLetter}
        </Avatar>
      </div>
    );
  }
}

AvatarUser.propTypes = {
  classes: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  login: PropTypes.string.isRequired,
};


export default withStyles(styles)(AvatarUser);

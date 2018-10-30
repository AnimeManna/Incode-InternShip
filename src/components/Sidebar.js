import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';


import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';

import {
  Chat,
  Delete,

} from '@material-ui/icons';


const styles = theme => ({
  Sidebar: {
    width: '20%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
    borderRight: '1px solid gray',
  },
  Sidebar__Button: {
    textDecoration: 'none',
  },
  Sidebar__ItemText: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Sidebar extends Component {
  componentDidMount() {
    const {
      onGetCategories,
    } = this.props;
    onGetCategories();
  }

  render() {
    const {
      classes,
      categories,
      onDeleteCategory,
      onChangePostCategories,
      snackBarStatus,
      onCloseSnackBar,
      snackBarMessage,
      getIsLoaded,
      isAuth,
    } = this.props;

    if (!getIsLoaded && isAuth) {
      return <CircularProgress className={classes.progress} />;
    }
    console.log(this.props);
    return (
      <div className={classes.Sidebar}>
        <List component="nav">
          {categories.map((category) => {
            const { title, id } = category;
            return (
              <Link to="/home" className={classes.Sidebar__Button} key={id}>
                <ListItem button>
                  <div
                    className={classes.Sidebar__ItemText}
                    onClick={() => { onChangePostCategories(title); }}
                  >
                    <ListItemIcon>
                      <Chat />
                    </ListItemIcon>
                    <ListItemText inset primary={title} />
                  </div>
                  <ListItemIcon onClick={() => {
                    onDeleteCategory(id);
                  }}
                  >
                    <Delete />
                  </ListItemIcon>
                </ListItem>
                <Divider />
              </Link>
            );
          })}
        </List>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={snackBarStatus}
          onClose={onCloseSnackBar}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snackBarMessage}</span>}
        />
      </div>
    );
  }
}

Sidebar.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  snackBarMessage: PropTypes.string.isRequired,
  snackBarStatus: PropTypes.bool.isRequired,
  getIsLoaded: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    Sidebar__Button: PropTypes.string.isRequired,
    Sidebar: PropTypes.string.isRequired,
    Sidebar__ItemText: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  onGetCategories: PropTypes.func.isRequired,
  onChangePostCategories: PropTypes.func.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
  onCloseSnackBar: PropTypes.func.isRequired,
};


export default (withStyles(styles)(Sidebar));

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import App from './App';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

import {dispatchUserID} from '../actionsCreators/accountActions';
import {openModalNewPost} from '../actionsCreators/modalNewPostActions';
import {logOut} from '../actionsCreators/logoutActions';
import { changePostCategories, getPosts } from '../actionsCreators/postsActions';
import { getCategories, deleteCategory } from '../actionsCreators/categoryActions';
import { closeSnackBar } from '../actionsCreators/snackBarActions';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  Main__Content: {
    display: 'flex',
    justifyContent: 'center',
  },

});

class Main extends Component {
  render() {
    const {
      classes,
      onCloseSnackBar,
      onGetCategories,
      onDeleteCategory,
      onChangePostCategories,
      categories,
      isAuth,
      snackBarStatus,
      snackBarMessage,
      getIsLoaded,
      onLogOut,
      onGetPosts,
      onDispatchUserID,
      onOpenModalNewPost,
      UserID,
    } = this.props;
    return (
      <div>
        <Header
          onOpenModalNewPost={onOpenModalNewPost}
          onLogOut={onLogOut}
          onGetPosts={onGetPosts}
          onDispatchUserID={onDispatchUserID}
          isAuth={isAuth}
          UserID={UserID}
        />
        <div className={classes.toolbar} />
        <div className={classes.Main__Content}>
          <Sidebar
            onCloseSnackBar={onCloseSnackBar}
            onGetCategories={onGetCategories}
            onDeleteCategory={onDeleteCategory}
            onChangePostCategories={onChangePostCategories}
            isAuth={isAuth}
            categories={categories}
            snackBarStatus={snackBarStatus}
            snackBarMessage={snackBarMessage}
            getIsLoaded={getIsLoaded}
          />
          <App />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape({
    toolbar: PropTypes.string.isRequired,
    Main__Content: PropTypes.string.isRequired,
  }).isRequired,
  getIsLoaded: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired,
  snackBarStatus: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  snackBarMessage: PropTypes.string.isRequired,
  onDeleteCategory: PropTypes.func.isRequired,
  onGetCategories: PropTypes.func.isRequired,
  onCloseSnackBar: PropTypes.func.isRequired,
  onChangePostCategories: PropTypes.func.isRequired,
  onGetPosts: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
  onDispatchUserID: PropTypes.func.isRequired,
  onOpenModalNewPost: PropTypes.func.isRequired,
  UserID: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuth: state.authReducer.success,
  categories: state.categoryReducer.categories,
  snackBarStatus: state.snackBarReducer.openSnackBar,
  snackBarMessage: state.snackBarReducer.message,
  getIsLoaded: state.categoryReducer.getIsLoaded,
  UserID: state.authReducer.user.id,
});

const mapDispatchToProps = {
  onGetCategories: getCategories,
  onDeleteCategory: deleteCategory,
  onChangePostCategories: changePostCategories,
  onCloseSnackBar: closeSnackBar,
  onGetPosts: getPosts,
  onLogOut: logOut,
  onDispatchUserID: dispatchUserID,
  onOpenModalNewPost: openModalNewPost,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Main)));

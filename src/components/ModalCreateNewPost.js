import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Dialog,
} from '@material-ui/core';
import CreateNewPost from './CreateNewPost';

import { closeModalNewPost } from '../actionsCreators/modalNewPostActions';


const modalCreateNewPost = (props) => {
  const {
    statusModal,
    onCloseModalNewPost,
  } = props;
  return (
    <Dialog
      onClose={onCloseModalNewPost}
      open={statusModal}
      aria-labelledby="simple-dialog-title"
    >
      <CreateNewPost />
    </Dialog>
  );
};

modalCreateNewPost.propTypes = {
  statusModal: PropTypes.bool.isRequired,
  onCloseModalNewPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  statusModal: state.modalNewPostReducer.openModal,
});

const mapDispatchToProps = {
  onCloseModalNewPost: closeModalNewPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(modalCreateNewPost);

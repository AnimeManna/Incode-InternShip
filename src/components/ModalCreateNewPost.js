import React from 'react';


import PropTypes from 'prop-types';

import {
  Dialog,
} from '@material-ui/core';
import CreateNewPost from './CreateNewPost';


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


export default modalCreateNewPost;

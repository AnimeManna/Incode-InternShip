import React, { Component } from 'react';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  Typography,
  Divider,
  CircularProgress,
} from '@material-ui/core';


import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  ExpandMore,
  Delete,
  Brush,
  Send,
} from '@material-ui/icons';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AvatarUser from '../components/AvatarUser';
import { getPosts, deletePost, changePost } from '../actionsCreators/postsActions';

import { dispatchUserID } from '../actionsCreators/accountActions';


const styles = theme => ({
  Posts__heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: '50%',
  },
  Posts__secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  Posts__Author: {
    fontSize: 18,
    color: 'gray',
  },
  Posts__Title: {
    fontSize: 20,
  },
  Post__Actions: {
    color: 'gray',
    cursor: 'pointer',
  },
  Post__EmptyMessage: {
    textAlign: 'center',
    fontSize: 32,
  },
  Post__CategoryName: {
    color: 'gray',
    fontSize: 10,
  },
  Post__Link: {
    textDecoration: 'none',
  },
  Post__CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Posts extends Component {
  static checkAuthor(login, author) {
    return login === author;
  }

  componentDidMount() {
    const { onGetPosts } = this.props;
    onGetPosts();
  }


  render() {
    const {
      posts,
      classes,
      login,
      isLoaded,
      onDeletePost,
      onChangePost,
      deleteIsLoaded,
      postsCategoryIsLoaded,
      onDispatchUserID,
    } = this.props;

    if (!isLoaded || !postsCategoryIsLoaded) {
      return <CircularProgress className={classes.progress} />;
    }

    if (posts.length === 0) {
      return (
        <div>
          <Typography className={classes.Post__EmptyMessage}>
            Простите но сейчас записей нет, но уверен скоро они появяться буд-то из ниоткуда)
          </Typography>
        </div>
      );
    }

    return (
      <div>
        {posts.map((post) => {
          const {
            id,
            title,
            body,
          } = post;
          const categoryName = post.category_name;
          const authorName = post.author_name;
          const authorId = post.author_id;
          return (
            <ExpansionPanel key={id}>
              <ExpansionPanelSummary expandIcon={
                <ExpandMore />
                    }
              >
                <Link
                  to={`/post/author/${authorId}`}
                  className={classes.Post__Link}
                  onClick={() => {
                    onDispatchUserID(authorId);
                  }}
                >
                  <div className={classes.Posts__heading}>
                    <AvatarUser
                      login={authorName}
                    />
                  </div>
                </Link>
                <div className={classes.Posts__secondaryHeading}>
                  <div>
                    <Typography className={classes.Posts__Author}>
                      {authorName}
:
                    </Typography>
                  </div>
                  <Typography
                    className={classes.Post__CategoryName}
                  >
                                Category:
                    {categoryName}
                  </Typography>
                  <Typography className={classes.Posts__Title}>{title}</Typography>
                </div>
              </ExpansionPanelSummary>
              <Divider />
              {' '}
              <ExpansionPanelDetails>
                <Typography>
                  {body}
                </Typography>
              </ExpansionPanelDetails>
              <Divider />
              <ExpansionPanelActions>
                {Posts.checkAuthor(login, authorName)
                  ? (
                    <div>
                      {deleteIsLoaded
                        ? null
                        : <CircularProgress />
                                    }
                      <Delete
                        className={classes.Post__Actions}
                        onClick={() => {
                          onDeletePost(`post/${id}`);
                        }}
                      />
                      <Link to="/updatePost">
                        <Brush
                          className={classes.Post__Actions}
                          onClick={() => {
                            onChangePost(id);
                          }}
                        />
                      </Link>
                    </div>
                  )
                  : null}
                <Link to={`/post/${id}`}>
                  <Send
                    onClick={() => {
                      onChangePost(id);
                    }}
                    className={classes.Post__Actions}
                  />
                </Link>
              </ExpansionPanelActions>
            </ExpansionPanel>
          );
        })}
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category_name: PropTypes.string.isRequired,
      category_id: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  login: PropTypes.string.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  deleteIsLoaded: PropTypes.bool.isRequired,
  postsCategoryIsLoaded: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    Posts__secondaryHeading: PropTypes.string.isRequired,
    Posts__Author: PropTypes.string.isRequired,
    Posts__heading: PropTypes.string.isRequired,
    Posts__Title: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  onChangePost: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onDispatchUserID: PropTypes.func.isRequired,
  onGetPosts: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({
  posts: state.postsReducer.posts,
  login: state.authReducer.user.login,
  isLoaded: state.postsReducer.isLoaded,
  deleteIsLoaded: state.postsReducer.deleteIsLoaded,
  postsCategoryIsLoaded: state.postsReducer.postsCategoryIsLoaded,
});

const mapDispatchToProps = {
  onGetPosts: getPosts,
  onDeletePost: deletePost,
  onChangePost: changePost,
  onDispatchUserID: dispatchUserID,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts));

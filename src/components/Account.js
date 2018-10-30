import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Brush,
  Delete,
  ExpandMore,
  Send,
} from '@material-ui/icons';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Divider,
  CircularProgress,
  ExpansionPanelActions,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getUserPostsById } from '../actionsCreators/accountActions';

import { changePost, deletePost } from '../actionsCreators/postsActions';

import CreateNewPost from './CreateNewPost';


const styles = theme => ({
  Account__Header: {
    display: 'flex',
  },
  Account__heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    borderRadius: '50%',
  },
  Account__secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  Account__Author: {
    fontSize: 18,
    color: 'gray',
  },
  Account__Title: {
    fontSize: 20,
  },

  Account__Avatar: {
    width: 60,
    height: 60,
    margin: 4,
  },
  Account__CategoryName: {
    color: 'gray',
    fontSize: 10,
  },
  Account__Actions: {
    color: 'gray',
    cursor: 'pointer',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Account extends Component {
  componentDidMount() {
    const { onGetUserPostsById } = this.props;
    const { props } = this;
    const { id } = props.match.params;
    onGetUserPostsById(id);
  }


  createFirstLetter(login) {
    return login.charAt(0);
  }

  createLastLetter(login) {
    const numberLastLetter = login.length - 1;
    return login.charAt(numberLastLetter);
  }

  createColorFirstLetter(login) {
    const letter = this.createFirstLetter(login);
    return letter.charCodeAt();
  }

  createColorLastLetter(login) {
    const letter = this.createLastLetter(login);
    return letter.charCodeAt();
  }

  render() {
    const {
      posts,
      classes,
      userID,
      deleteIsLoaded,
      postsIsLoaded,
      onChangePost,
      onDeletePost,
    } = this.props;
    const { props } = this;
    const {
      id,
    } = props.match.params;
    return (
      <div>
        <div className={classes.Account__Header}>
          {(userID === id)
            ? <CreateNewPost />
            : null}
        </div>
        {postsIsLoaded
          ? posts.map((post) => {
            const {
              title,
              body,
            } = post;
            const authorName = post.author_name;
            const authorId = post.author_id;
            const categoryName = post.category_name;
            return (
              <ExpansionPanel key={post.id}>
                <ExpansionPanelSummary expandIcon={
                  <ExpandMore />
                            }
                >
                  <div
                    className={classes.Account__heading}
                  >
                    <Avatar
                      className={classes.Account__Avatar}
                      style={{ backgroundColor: `rgb(${this.createColorFirstLetter(authorName)},50,${this.createColorLastLetter(authorName)})` }}
                    >
                      {this.createFirstLetter(authorName)}
                      {this.createLastLetter(authorName)}
                    </Avatar>
                  </div>
                  <div className={classes.Account__secondaryHeading}>
                    <div>
                      <Typography
                        className={classes.Account__Author}
                      >
                        {authorName}
:
                      </Typography>
                    </div>
                    <Typography
                      className={classes.Account__CategoryName}
                    >
                      Category:
                      {categoryName}
                    </Typography>
                    <Typography
                      className={classes.Account__Title}
                    >
                      {title}
                    </Typography>
                  </div>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails>
                  <Typography>
                    {body}
                  </Typography>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                  {(userID === authorId)
                    ? (
                      <div>
                        {deleteIsLoaded
                          ? null
                          : <CircularProgress />}
                        <Delete
                          className={classes.Account__Actions}
                          onClick={() => {
                            onDeletePost(`post/${post.id}`, id);
                          }}
                        />
                        <Link to="/updatePost">
                          <Brush
                            className={classes.Account__Actions}
                            onClick={() => {
                              onChangePost(post.id);
                            }}
                          />
                        </Link>
                      </div>
                    )
                    : null}
                  <Link to={`/post/${post.id}`}>
                    <Send
                      onClick={() => {
                        onChangePost(post.id);
                      }}
                      className={classes.Account__Actions}
                    />
                  </Link>
                </ExpansionPanelActions>
              </ExpansionPanel>
            );
          })
          : <CircularProgress />
                }
      </div>
    );
  }
}

Account.propTypes = {
  onGetUserPostsById: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
  onDeletePost: PropTypes.func.isRequired,
  postsIsLoaded: PropTypes.bool.isRequired,
  deleteIsLoaded: PropTypes.bool.isRequired,
  userID: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    Account__Actions: PropTypes.string.isRequired,
    Account__Author: PropTypes.string.isRequired,
    Account__Avatar: PropTypes.string.isRequired,
    Account__CategoryName: PropTypes.string.isRequired,
    Account__Header: PropTypes.string.isRequired,
    Account__heading: PropTypes.string.isRequired,
    Account__secondaryHeading: PropTypes.string.isRequired,
    Account__Title: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category_name: PropTypes.string.isRequired,
      category_id: PropTypes.string.isRequired,
    }),
  ).isRequired,

};

const mapStateToProps = state => ({
  posts: state.accountReducer.posts,
  userID: state.authReducer.user.id,
  deleteIsLoaded: state.postsReducer.deleteIsLoaded,
  postsIsLoaded: state.accountReducer.isLoaded,
});

const mapDispatchToProps = {
  onGetUserPostsById: getUserPostsById,
  onChangePost: changePost,
  onDeletePost: deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));

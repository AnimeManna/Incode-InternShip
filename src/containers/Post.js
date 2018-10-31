import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import {
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from '@material-ui/core';
import {
  Delete,
} from '@material-ui/icons';
import { getPost } from '../actionsCreators/postActions';

import { sendComment, getComments, deleteComment } from '../actionsCreators/commentActions';

import AvatarUser from '../components/AvatarUser';

const styles = theme => ({
  Post__Paper: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  Post__Content: {
    width: '100%',
    marginBottom: 5,
  },
  Post__Body: {
    width: '95%',
    border: '1px solid gray',
    padding: 10,
  },
  Post__NewComment: {
    width: '97%',
    marginTop: 30,
    padding: 20,
  },
  Post__Comment: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  Post__CommentAvatar: {
    width: 40,
    height: 40,
    margin: 4,
  },
  Post__Comments: {
    marginTop: 10,
  },
  Post__CommentDelete: {
    color: 'gray',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  Post_CommentContent: {
    flexGrow: 1,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newComment: {
        isValid: false,
        text: '',
      },
    };
    this.changeInputComment = this.changeInputComment.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }


  componentDidMount() {
    const { onGetPost, onGetComments, userId } = this.props;
    onGetPost(userId);
    onGetComments(userId);
  }

  isValid(valueInput) {
    return valueInput.length > 2;
  }

  changeInputComment(event) {
    const { value } = event.target;
    if (this.isValid(value)) {
      this.setState({
        newComment: {
          isValid: true,
          text: value,
        },
      });
    } else {
      this.setState({
        newComment: {
          isValid: false,
          text: value,
        },
      });
    }
  }

  clearInput() {
    this.setState({
      newComment: {
        isValid: false,
        text: '',
      },
    });
  }


  render() {
    const { props, state } = this;
    const {
      isLoaded,
      commentsIsLoaded,
      classes,
      onSendComment,
      userId,
      comments,
      idAuthorComment,
      authorComment,
      onDeleteComment,
      commentLoaded,
    } = this.props;
    const authorPostName = props.post.author_name;
    const bodyPost = props.post.body;
    const titlePost = props.post.title;

    const {
      isValid,
      text,
    } = state.newComment;


    if (!isLoaded) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div>
        <Paper className={classes.Post__Paper}>
          <AvatarUser
            login={authorPostName}
          />
          <div className={classes.Post__Content}>
            <Typography variant="display1">{titlePost}</Typography>
            <Typography className={classes.Post__Body} vairant="h6">{bodyPost}</Typography>
          </div>
        </Paper>
        <Paper className={classes.Post__Comments}>
          <Typography variant="display1">Comments:</Typography>
          {commentsIsLoaded
            ? comments.map((comment) => {
              const {
                id,
                body,
              } = comment;
              const authorName = comment.author_name;
              return (
                <Paper key={id} className={classes.Post__Comment}>
                  <AvatarUser
                    className={classes.Post__CommentAvatar}
                    login={authorName}
                  />
                  <div className={classes.Post_CommentContent}>
                    <Typography>
                      {authorName}
                      {' '}
say:
                    </Typography>
                    <Typography>{body}</Typography>
                  </div>
                  {(authorPostName === authorComment || authorName === authorComment)
                    ? (
                      <Delete
                        className={classes.Post__CommentDelete}
                        onClick={() => {
                          onDeleteComment(`comment/${comment.id}`, userId);
                        }}
                      />
                    )
                    : null
                                }


                </Paper>
              );
            })
            : <CircularProgress />}
        </Paper>
        <Paper className={classes.Post__NewComment}>
          <TextField
            variant="outlined"
            multiline
            fullWidth
            rows="6"
            label="Want to leave a comment?"
            placeholder="Write your comment"
            onChange={this.changeInputComment}
            value={text}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!isValid}
            onClick={() => {
              onSendComment({
                body: text,
                author_id: idAuthorComment,
                author_name: authorComment,
                post_id: userId,
              }, userId);
              this.clearInput();
            }}
          >
Send
          </Button>
          {commentLoaded
            ? null
            : <CircularProgress className={classes.progress} />}
        </Paper>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  authorComment: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      body: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      author_name: PropTypes.string.isRequired,
      author_id: PropTypes.string.isRequired,
      post_id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  commentLoaded: PropTypes.bool.isRequired,
  commentsIsLoaded: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  idAuthorComment: PropTypes.string.isRequired,
  onGetComments: PropTypes.func.isRequired,
  onGetPost: PropTypes.func.isRequired,
  onDeleteComment: PropTypes.func.isRequired,
  onSendComment: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    Post__CommentDelete: PropTypes.string.isRequired,
    Post__Body: PropTypes.string.isRequired,
    Post__CommentAvatar: PropTypes.string.isRequired,
    Post__Comments: PropTypes.string.isRequired,
    Post__Content: PropTypes.string.isRequired,
    Post__NewComment: PropTypes.string.isRequired,
    Post__Paper: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  post: state.postReducer.post,
  userId: state.postsReducer.updatePostID,
  isLoaded: state.postReducer.isLoaded,
  authorComment: state.authReducer.user.login,
  idAuthorComment: state.authReducer.user.id,
  comments: state.commentReducer.comments,
  commentsIsLoaded: state.commentReducer.isLoaded,
  commentLoaded: state.commentReducer.commentLoaded,
});

const mapDispatchToProps = {
  onGetPost: getPost,
  onSendComment: sendComment,
  onGetComments: getComments,
  onDeleteComment: deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post));

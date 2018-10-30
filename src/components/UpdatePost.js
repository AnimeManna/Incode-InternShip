import React, { Component } from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Button,
  Paper,
  MenuItem,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { updatePost, getPostForUpdate } from '../actionsCreators/postActions';


const styles = () => ({
  UpdatePost__Menu: {
    width: 300,
  },
  UpdatePost__SelectCategory: {
    width: 200,
    marginRight: 30,
  },
});

class UpdatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        text: '',
        isChanged: false,
        isValid: false,
      },
      body: {
        text: '',
        isChanged: false,
        isValid: false,
      },
      selectCategory: {
        isChanged: false,
        isValid: false,
      },
      isValid: true,
      category: '',
      category_id: '',
    };
    this.transferData = this.transferData.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.changeInput = this.changeInput.bind(this);
    this.checkingInputValidation = this.checkingInputValidation.bind(this);
    this.checkInputsValid = this.checkInputsValid.bind(this);
    this.checkTitle = this.checkTitle.bind(this);
    this.checkBody = this.checkBody.bind(this);
    this.checkCategory = this.checkCategory.bind(this);
    this.findIdCategory = this.findIdCategory.bind(this);
  }


  componentDidMount() {
    const { onGetPostForUpdate, id } = this.props;
    onGetPostForUpdate(id);
  }

  selectCategory(event) {
    const {
      name,
      value,
    } = event.target;
    this.setState({
      [name]: {
        isChanged: true,
        isValid: true,
      },
      category: value,
    }, () => {
      this.checkInputsValid();
      this.findIdCategory();
    });
  }

  findIdCategory() {
    const { props } = this;
    const { state } = this;
    const category = props.categories.find(oneCategory => oneCategory.title === state.category);
    const { id } = category;
    this.setState({
      category_id: id,
    });
  }

  checkBody() {
    const { state } = this;
    const {
      body,
    } = state;
    const {
      post,
    } = this.props;
    if (!body.isChanged) {
      this.setState({
        body: {
          ...state.body,
          text: post.body,
        },
      }, () => {
        this.checkCategory();
      });
    } else {
      this.checkCategory();
    }
  }

  checkTitle() {
    const { state } = this;
    const {
      title,
    } = state;
    const {
      post,
    } = this.props;
    if (!title.isChanged) {
      this.setState({
        title: {
          ...state.title,
          text: post.title,
        },
      }, () => {
        this.checkBody();
      });
    } else {
      this.checkBody();
    }
  }

  checkCategory() {
    const {
      selectCategory,
      title,
      body,
    } = this.state;
    const { state } = this;
    const categoryId = state.category_id;
    const {
      post,
      onUpdatePost,
      id,
    } = this.props;
    if (!selectCategory.isChanged) {
      this.setState({
        category: post.category_name,
      }, () => {
        onUpdatePost({
          id,
          title: title.text,
          body: body.text,
          author_id: post.author_id,
          author_name: post.author_name,
          category_id: categoryId,
          category_name: state.category,
          posted_at: post.posted_at,
        }, id);
      });
    } else {
      onUpdatePost({
        id,
        title: title.text,
        body: body.text,
        author_id: post.author_id,
        author_name: post.author_name,
        category_name: post.category_name,
        category_id: post.category_id,
      }, id);
    }
  }

  transferData(event) {
    const { state } = this;
    const { post } = this.props;
    const { name } = event.target;
    this.setState({
      [name]: {
        ...state[name],
        isChanged: true,
        text: post[name],
      },
    });
  }

  isValid(valueInput) {
    return valueInput.length > 2;
  }

  checkInputsValid() {
    const {
      title,
      body,
      selectCategory,
    } = this.state;
    if (title.isValid || body.isValid || selectCategory.isValid) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  checkingInputValidation(nameInput, valueInput) {
    const { state } = this;
    if (this.isValid(valueInput)) {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          isValid: true,
        },
      }, () => {
        this.checkInputsValid();
      });
    } else {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          isValid: false,
        },
      }, () => {
        this.checkInputsValid();
      });
    }
  }

  changeInput(event) {
    const { name, value } = event.target;
    const { state } = this;

    this.setState({
      [name]: {
        isChanged: state[name].isChanged,
        isValid: state[name].isValid,
        text: value,
      },
    }, () => {
      this.checkingInputValidation(name, value);
    });
  }

  render() {
    const {
      isValid,
      category,
    } = this.state;
    const {
      categories,
      post,
      classes,
      isLoaded,
      statusLoadedPost,
      updateIsLoaded,
    } = this.props;

    if (!isLoaded) {
      return <CircularProgress />;
    }

    if (!statusLoadedPost) {
      return (
        <Typography>
                Оопсс что-то пошло не так повторите попытку позже
        </Typography>
      );
    }

    return (
      <Paper>
        <TextField
          name="title"
          variant="outlined"
          fullWidth
          placeholder={post.title}
          label="Click for update title"
          onClick={this.transferData}
          margin="normal"
          onChange={this.changeInput}
        />
        <TextField
          select
          label="Select category"
          name="selectCategory"
          value={category}
          className={classes.UpdatePost__SelectCategory}
          placeholder={post.category_name}
          onChange={this.selectCategory}
          SelectProps={{
            MenuProps: {
              className: classes.UpdatePost__Menu,
            },
          }}
          margin="normal"
          variant="outlined"
        >
          {categories.map(oneCategory => (
            <MenuItem key={oneCategory.id} value={oneCategory.title}>
              {oneCategory.title}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="body"
          variant="outlined"
          multiline
          margin="normal"
          placeholder={post.body}
          rows="6"
          fullWidth
          label="Click for update body"
          onChange={this.changeInput}
          onClick={this.transferData}
        />
        <Button
          variant="contained"
          color="primary"
          margin="normal"
          disabled={!isValid}
          onClick={this.checkTitle}
        >
                    Update post
        </Button>
        {updateIsLoaded
          ? null
          : <CircularProgress />}
      </Paper>
    );
  }
}

UpdatePost.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    UpdatePost__SelectCategory: PropTypes.string.isRequired,
    UpdatePost__Menu: PropTypes.string.isRequired,
  }).isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    category_id: PropTypes.string.isRequired,
    posted_at: PropTypes.string.isRequired,
    author_name: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  statusLoadedPost: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  updateIsLoaded: PropTypes.bool.isRequired,
  onGetPostForUpdate: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.postsReducer.updatePostID,
  post: state.updatePostReducer.post,
  categories: state.categoryReducer.categories,
  statusLoadedPost: state.updatePostReducer.success,
  isLoaded: state.updatePostReducer.isLoaded,
  updateIsLoaded: state.updatePostReducer.updateIsLoaded,

});

const mapDispatchToProps = {
  onGetPostForUpdate: getPostForUpdate,
  onUpdatePost: updatePost,

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdatePost));

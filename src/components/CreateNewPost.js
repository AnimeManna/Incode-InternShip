import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';

import {
  Paper,
  TextField,
  Typography,
  Button,
  MenuItem,
  CircularProgress,
} from '@material-ui/core';

import { connect } from 'react-redux';
import AvatarUser from './AvatarUser';


import { inputChanged, inputValid } from '../actionsCreators/InputActions';
import { sendNewPost } from '../actionsCreators/newPostActions';

const styles = theme => ({
  CreateNewPost: {
    width: '100%',
  },
  CreateNewPost__Paper: {
    width: '98%',
    height: 500,
    padding: 5,
  },
  CreateNewPost__Text: {
    margin: 5,
    textAlign: 'center',
  },
  CreateNewPost__Title: {
    width: '95%',
    padding: 20,
  },
  CreateNewPost__Content: {
    marginTop: 10,
    height: 300,
  },
  CreateNewPost__Footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  CreateNewPost__CreateCategory: {
    marginTop: 3,
    width: 400,
  },
  CreateNewPost__ErrorMessage: {
    padding: 7,
  },
  CreateNewPost__Header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  CreateNewPost__CategoryInputs: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menu: {
    width: 300,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
});

class CreateNewPost extends Component {
  static isValid(value) {
    return value.length < 255 && value.length > 2;
  }

  static isChanged(value) {
    return value.length > 0;
  }

  constructor(props) {
    super(props);
    this.state = {
      title: {
        text: '',
        isValid: true,
        isChanged: false,
      },
      body: {
        text: '',
        isValid: true,
        isChanged: false,
      },
      isValid: false,
      isChanged: false,
      selectCategory: {
        isChanged: false,
        name: '',
      },
      inputCategory: {
        isChanged: false,
        name: '',
      },
      category_id: undefined,
      category: '',
    };
    this.changeInputTitle = this.changeInputTitle.bind(this);
    this.changeInputBody = this.changeInputBody.bind(this);
    this.checkingInputValid = this.checkingInputValid.bind(this);
    this.checkValidStatus = this.checkValidStatus.bind(this);
    this.checkingInputChange = this.checkingInputChange.bind(this);
    this.checkChangedStatus = this.checkChangedStatus.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.findIdCategory = this.findIdCategory.bind(this);
    this.changeCategoryInput = this.changeCategoryInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }


  changeInputTitle(event) {
    const { value, name } = event.target;
    this.checkingInputValid(name, value);
  }

  changeInputBody(event) {
    const { value, name } = event.target;
    this.checkingInputValid(name, value);
  }


  checkingInputValid(nameInput, valueInput) {
    const { state } = this;
    if (CreateNewPost.isValid(valueInput)) {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          text: valueInput,
          isValid: true,
        },
      }, () => {
        this.checkValidStatus();
        this.checkingInputChange(nameInput, valueInput);
      });
    } else {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          text: valueInput,
          isValid: false,
        },
      }, () => {
        this.checkValidStatus();
        this.checkingInputChange(nameInput, valueInput);
      });
    }
  }

  checkValidStatus() {
    const { onInputValid } = this.props;
    const { body, title } = this.state;
    if (body.isValid && title.isValid) {
      this.setState({
        isValid: true,
      }, () => {
        const { isValid } = this.state;
        onInputValid('NEWPOST', isValid);
      });
    } else {
      this.setState({
        isValid: false,
      }, () => {
        const { isValid } = this.state;
        onInputValid('NEWPOST', isValid);
      });
    }
  }


  checkingInputChange(nameInput, valueInput) {
    const { state } = this;
    if (CreateNewPost.isChanged(valueInput)) {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          isChanged: true,
        },
      }, () => {
        this.checkChangedStatus();
      });
    } else {
      this.setState({
        [nameInput]: {
          ...state[nameInput],
          isChanged: false,
        },
      }, () => {
        this.checkChangedStatus();
      });
    }
  }


  checkChangedStatus() {
    const { onInputChanged } = this.props;
    const { title, body } = this.state;
    if (title.isChanged && body.isChanged) {
      this.setState({
        isChanged: true,
      }, () => {
        const { isChanged } = this.state;
        onInputChanged('NEWPOST', isChanged);
      });
    } else {
      this.setState({
        isChanged: false,
      }, () => {
        const { isChanged } = this.state;
        onInputChanged('NEWPOST', isChanged);
      });
    }
  }

  findIdCategory() {
    const { categories } = this.props;
    const { state } = this;
    const categoryName = state.category;
    const category = categories.find(oneCategory => oneCategory.title === categoryName);
    const { id } = category;
    this.setState({
      category_id: id,
    });
  }

  changeCategoryInput(event) {
    const { value, name } = event.target;
    if (this.isChanged(value)) {
      this.setState({
        [name]: {
          isChanged: true,
        },
        category: value,
      });
    } else {
      this.setState({
        [name]: {
          isChanged: false,
        },
        category: value,
      });
    }
  }

  changeCategory(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: {
        isChanged: true,
      },
      category: value,
    }, () => {
      this.findIdCategory();
    });
  }

  clearInput() {
    this.setState({
      title: {
        text: '',
        isValid: true,
        isChanged: false,
      },
      body: {
        text: '',
        isValid: true,
        isChanged: false,
      },
      inputCategory: {
        isChanged: false,
        name: '',
      },
      selectCategory: {
        isChanged: false,
        name: '',
      },
      category: '',
    });
  }

  render() {
    const {
      classes, author, isValid, isChanged, onSendNewPost, categories, id, newPostIsLoaded,
    } = this.props;
    const {
      title, body, category,
    } = this.state;
    const { state } = this;
    const { selectCategory } = state;
    const categoryID = state.category_id;
    return (
      <div className={classes.CreateNewPost}>
        <Paper className={classes.CreateNewPost__Paper}>
          <div>
            <div className={classes.CreateNewPost__Header}>
              <AvatarUser
                login={author}
              />
              <Typography variant="display2">
                {author}
                {' '}
say:
              </Typography>
            </div>
          </div>
          <TextField
            variant="outlined"
            label="Title"
            fullWidth
            placeholder="Enter title your post"
            margin="normal"
            name="title"
            value={title.text}
            onChange={this.changeInputTitle}
            error={!title.isValid}
          />
          <div className={classes.CreateNewPost__CategoryInputs}>
            <TextField
              select
              label="Select category"
              name="selectCategory"
              className={classes.textField}
              value={category}
              onChange={this.changeCategory}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
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
              disabled={selectCategory.isChanged}
              onChange={this.changeCategoryInput}
              name="inputCategory"
              placeholder="New categories"
              variant="outlined"
              value={category}
              label="Or create new!"
              className={classes.CreateNewPost__CreateCategory}
            />
          </div>
          <TextField
            variant="outlined"
            label="Content"
            fullWidth
            placeholder="Enter a content your post"
            multiline
            value={body.text}
            rows="8"
            margin="normal"
            name="body"
            onChange={this.changeInputBody}
            error={!body.isValid}
          />
          <div className={classes.CreateNewPost__Footer}>
            <Button
              disabled={!isValid || !isChanged}
              variant="contained"
              color="primary"
              onClick={() => {
                onSendNewPost({
                  title: title.text,
                  body: body.text,
                  author_id: id,
                  author_name: author,
                  category_id: categoryID,
                  category_name: category,
                }, id);
                this.clearInput();
              }}
            >
Send
            </Button>
            {newPostIsLoaded
              ? null
              : <CircularProgress />}
          </div>
        </Paper>
      </div>
    );
  }
}

CreateNewPost.propTypes = {
  classes: PropTypes.shape({
    CreateNewPost: PropTypes.string.isRequired,
    CreateNewPost__CreateCategory: PropTypes.string.isRequired,
    CreateNewPost__ErrorMessage: PropTypes.string.isRequired,
    CreateNewPost__Content: PropTypes.string.isRequired,
    CreateNewPost__CategoryInputs: PropTypes.string.isRequired,
    CreateNewPost__Footer: PropTypes.string.isRequired,
    CreateNewPost__Paper: PropTypes.string.isRequired,
    CreateNewPost__Text: PropTypes.string.isRequired,
    CreateNewPost__Title: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      },
    ),
  ).isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isChanged: PropTypes.bool.isRequired,
  newPostIsLoaded: PropTypes.bool.isRequired,
  onSendNewPost: PropTypes.func.isRequired,
  onInputChanged: PropTypes.func.isRequired,
  onInputValid: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  id: state.authReducer.user.id,
  author: state.authReducer.user.login,
  isValid: state.newPostReducer.isValid,
  isChanged: state.newPostReducer.isChanged,
  categories: state.categoryReducer.categories,
  newPostIsLoaded: state.newPostReducer.newPostIsLoaded,

});

const mapDispatchTopProps = {
  onInputValid: inputValid,
  onInputChanged: inputChanged,
  onSendNewPost: sendNewPost,
};

export default connect(mapStateToProps, mapDispatchTopProps)(withStyles(styles)(CreateNewPost));

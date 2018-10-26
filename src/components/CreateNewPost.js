import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'

import {
    Paper,
    TextField,
    Typography,
    Button,
    MenuItem
} from '@material-ui/core'

import AvatarUser from './AvatarUser'

import {connect} from 'react-redux'



import {inputChanged, inputValid} from "../actionsCreators/InputActions";
import {sendNewPost} from "../actionsCreators/newPostActions";

const styles = theme => ({
    CreateNewPost: {},
    CreateNewPost__Paper: {
        width: '98%',
        height: 500,
        padding: 10
    },
    CreateNewPost__Text: {
        margin: 5,
        textAlign: 'center'
    },
    CreateNewPost__Title: {
        width: '95%',
        padding: 20
    },
    CreateNewPost__Content: {
        marginTop: 10,
        height: 300
    },
    CreateNewPost__Footer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    CreateNewPost__CreateCategory: {
        marginTop: 3,
        width: 700
    },
    CreateNewPost__ErrorMessage: {
        padding: 7
    },
    CreateNewPost__Header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    CreateNewPost__CategoryInputs: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    menu: {
        width: 300,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 100
    },
});

class CreateNewPost extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: {
                text: '',
                isValid: true,
                isChanged: false
            },
            body: {
                text: '',
                isValid: true,
                isChanged: false
            },
            isValid: false,
            isChanged: false,
            selectCategory: {
                isChanged: false,
                name: ''
            },
            inputCategory: {
                isChanged: false,
                name: ''
            },
            category_id: undefined,
            category: ''
        }
        this.changeInputTitle = this.changeInputTitle.bind(this);
        this.changeInputBody = this.changeInputBody.bind(this);
        this.checkingInputValid = this.checkingInputValid.bind(this);
        this.checkValidStatus = this.checkValidStatus.bind(this);
        this.checkingInputChange = this.checkingInputChange.bind(this);
        this.checkChangedStatus = this.checkChangedStatus.bind(this)
        this.changeCategory = this.changeCategory.bind(this)
        this.findIdCategory = this.findIdCategory.bind(this)
        this.changeCategoryInput = this.changeCategoryInput.bind(this)
    }


    changeInputTitle(event) {
        const {value, name} = event.target;
        this.checkingInputValid(name, value)
    }

    changeInputBody(event) {
        const {value, name} = event.target;
        this.checkingInputValid(name, value)
    }

    isValid(value) {
        return value.length < 255 && value.length > 2
    }

    checkingInputValid(nameInput, valueInput) {
        if (this.isValid(valueInput)) {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    text: valueInput,
                    isValid: true
                }
            }, () => {
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput)
            })
        } else {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    text: valueInput,
                    isValid: false
                }
            }, () => {
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput)
            })
        }
    }

    checkValidStatus() {
        const {inputValid} = this.props
        const {body, title} = this.state;
        if (body.isValid && title.isValid) {
            this.setState({
                isValid: true
            }, () => {
                inputValid('NEWPOST', this.state.isValid)
            })
        } else {
            this.setState({
                isValid: false
            }, () => {
                inputValid('NEWPOST', this.state.isValid)
            })
        }
    }

    isChanged(value) {
        return value.length > 0
    }

    checkingInputChange(nameInput, valueInput) {
        if (this.isChanged(valueInput)) {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: true
                }
            }, () => {
                this.checkChangedStatus()
            })
        } else {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: false
                }
            }, () => {
                this.checkChangedStatus()
            })
        }
    }

    checkChangedStatus() {
        const {inputChanged} = this.props
        const {title, body} = this.state
        if (title.isChanged && body.isChanged) {
            this.setState({
                isChanged: true
            }, () => {
                inputChanged('NEWPOST', this.state.isChanged)
            })
        } else {
            this.setState({
                isChanged: false
            }, () => {
                inputChanged('NEWPOST', this.state.isChanged)
            })
        }
    }

    findIdCategory() {
        let category = this.props.categories.find((category) => {
            return category.title === this.state.category
        })
        let id = category.id;
        this.setState({
            category_id: id
        })
    }

    changeCategoryInput(event) {
        const {value, name} = event.target;
        if (this.isChanged(value)) {
            this.setState({
                [name]: {
                    isChanged: true
                },
                category: value
            })
        } else {
            this.setState({
                [name]: {
                    isChanged: false
                },
                category: value
            })
        }
    }

    changeCategory(event) {
        const {value, name} = event.target
        this.setState({
            [name]: {
                isChanged: true
            },
            category: value
        }, () => {
            this.findIdCategory()
        })
    }

    render() {
        const {classes, author, isValid, isChanged, sendNewPost, errorMessage, categories, id} = this.props;
        const {title, body, category, category_id} = this.state
        console.log(id)
        console.log(this.state)
        return (
            <div>
                <Paper className={classes.CreateNewPost__Paper}>
                    <div>
                        <div className={classes.CreateNewPost__Header}>
                            <AvatarUser/>
                            <Typography variant="h3">{author}</Typography>
                        </div>
                    </div>
                    <TextField
                        variant="outlined"
                        label="Title"
                        fullWidth
                        placeholder="Enter title your post"
                        margin="normal"
                        name='title'
                        onChange={this.changeInputTitle}
                        error={!title.isValid}
                    />
                    <div className={classes.CreateNewPost__CategoryInputs}>
                        <TextField
                            select
                            label="Select category"
                            name="selectCategory"
                            className={classes.textField}
                            value={this.state.category}
                            onChange={this.changeCategory}
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.title}>
                                    {category.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            disabled={this.state.selectCategory.isChanged}
                            onChange={this.changeCategoryInput}
                            name="inputCategory"
                            placeholder="New categories"
                            variant="outlined"
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
                        rows="8"
                        margin="normal"
                        name='body'
                        onChange={this.changeInputBody}
                        error={!body.isValid}
                    />
                    <div className={classes.CreateNewPost__Footer}>
                        <Button disabled={!isValid || !isChanged} variant="contained" color="primary" onClick={() => {

                            sendNewPost({
                                title: title.text,
                                body: body.text,
                                author_id: id,
                                author_name: author,
                                category_id: category_id,
                                category_name: category
                            })
                        }}>Send</Button>
                        <Typography className={classes.CreateNewPost__ErrorMessage}>{errorMessage}</Typography>
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.authReducer.user.id,
    author: state.authReducer.user.login,
    isValid: state.newPostReducer.isValid,
    isChanged: state.newPostReducer.isChanged,
    errorMessage: state.newPostReducer.errorMessage,
    categories: state.categoryReducer.categories
})

const mapDispatchTopProps = {
    inputValid,
    inputChanged,
    sendNewPost
}

export default connect(mapStateToProps, mapDispatchTopProps)(withStyles(styles)(CreateNewPost))
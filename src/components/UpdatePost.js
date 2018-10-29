import React, {Component} from 'react'

import {connect} from 'react-redux'


import {updatePost} from "../actionsCreators/postActions";

import {withStyles} from '@material-ui/core/styles'

import {getPostForUpdate} from "../actionsCreators/postActions";

import {
    TextField,
    Button,
    Paper, MenuItem
} from '@material-ui/core'

const styles = theme => ({
    UpdatePost__Menu: {
        width: 300,
    },
    UpdatePost__SelectCategory: {
        width: 200,
        marginRight: 30
    }
})

class UpdatePost extends Component {


    constructor(props) {
        super(props)
        this.state = {
            title: {
                text: '',
                isChanged: false,
                isValid: false
            },
            body: {
                text: '',
                isChanged: false,
                isValid: false
            },
            selectCategory: {
                isChanged: false,
                isValid: false
            },
            isValid: true,
            category: '',
            category_id: ''
        }
        this.transferData = this.transferData.bind(this);
        this.selectCategory = this.selectCategory.bind(this)
        this.changeInput = this.changeInput.bind(this)
        this.checkingInputValidation = this.checkingInputValidation.bind(this)
        this.checkInputsValid = this.checkInputsValid.bind(this)
        this.checkTitle = this.checkTitle.bind(this)
        this.checkBody = this.checkBody.bind(this)
        this.checkCategory = this.checkCategory.bind(this)
        this.findIdCategory = this.findIdCategory.bind(this)
    }


    componentDidMount() {
        const {getPostForUpdate, id} = this.props
        getPostForUpdate(id)
    }

    selectCategory(event) {
        const {
            name,
            value
        } = event.target
        console.log(value);
        this.setState({
            [name]: {
                isChanged: true,
                isValid: true
            },
            category: value
        }, () => {
            this.checkInputsValid();
            this.findIdCategory();
        })
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

    checkBody() {
        const {
            body
        } = this.state
        const {
            post
        } = this.props
        if (!body.isChanged) {
            this.setState({
                body: {
                    ...this.state.body,
                    text: post.body
                }
            }, () => {
                this.checkCategory()
            })
        } else {
            this.checkCategory()
        }
    }

    checkTitle() {
        const {
            title
        } = this.state;
        const {
            post
        } = this.props
        if (!title.isChanged) {
            this.setState({
                title: {
                    ...this.state.title,
                    text: post.title
                }
            }, () => {
                this.checkBody()
            })
        } else {
            this.checkBody()
        }
    }

    checkCategory() {
        const {
            selectCategory,
            title,
            body,
            category,
            category_id
        } = this.state
        const {
            post,
            updatePost,
            id
        } = this.props
        if (!selectCategory.isChanged) {
            this.setState({
                category: post.category_name
            }, () => {
                updatePost({
                    id: id,
                    title: title.text,
                    body: body.text,
                    author_id: post.author_id,
                    author_name: post.author_name,
                    category_id: category_id,
                    category_name: category,
                    posted_at: post.posted_at
                }, id)
            })
        } else {
            updatePost({
                id: id,
                title: title.text,
                body: body.text,
                author_id: post.author_id,
                author_name: post.author_name,
                category_name: category
            }, id)
        }
    }

    transferData(event) {
        const {post} = this.props
        const {name} = event.target
        this.setState({
            [name]: {
                ...this.state[name],
                isChanged: true,
                text: post[name]
            }
        })
    }

    isValid(valueInput) {
        return valueInput.length > 2
    }

    checkInputsValid() {
        const {
            title,
            body,
            selectCategory
        } = this.state
        if (title.isValid || body.isValid || selectCategory.isValid) {
            this.setState({
                isValid: true
            })
        } else {
            this.setState({
                isValid: false
            })
        }
    }

    checkingInputValidation(nameInput, valueInput) {
        if (this.isValid(valueInput)) {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isValid: true
                }
            }, () => {
                this.checkInputsValid()
            })
        } else {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isValid: false
                }
            }, () => {
                this.checkInputsValid()
            })
        }
    }

    changeInput(event) {
        const {name, value} = event.target
        this.setState({
            [name]: {
                ...this.state[name],
                text: value
            }
        }, () => {
            this.checkingInputValidation(name, value)
        })
    }

    render() {
        const {
            isValid,
            category
        } = this.state
        const {
            categories,
            post,
            classes
        } = this.props;
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
                    {categories.map(category => (
                        <MenuItem key={category.id} value={category.title}>
                            {category.title}
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
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.postsReducer.updatePostID,
    post: state.updatePostReducer.post,
    categories: state.categoryReducer.categories
})

const mapDispatchToProps = {
    getPostForUpdate,
    updatePost

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdatePost))
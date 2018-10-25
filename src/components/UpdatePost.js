import React, {Component} from 'react'

import {connect} from 'react-redux'

import {changePostUpdate} from "../actionsCreators/postsActions";

import {updatePost} from "../actionsCreators/postsActions";

import {withStyles} from '@material-ui/core/styles'

import {
    Typography,
    TextField,
    Button
} from '@material-ui/core'

const styles = theme => ({})

class UpdatePost extends Component {

    componentDidMount() {
        this.props.changePostUpdate(this.props.id);
    }

    constructor(props) {
        super(props)
        this.state = {
            title: {
                text: '',
                isChanged: false,
                isValid: false
            },
            content: {
                text: '',
                isChanged: false,
                isValid: false
            },
            isValid: true
        }
        this.transferData = this.transferData.bind(this);
        this.checkingChangedInput = this.checkingChangedInput.bind(this);
        this.changeSomeInput = this.changeSomeInput.bind(this)
    }

    changeSomeInput(event) {
        const {name, value} = event.target

        this.setState({
            [name]: {
                ...this.state.name,
                text: value
            }
        }, () => {
            this.checkingChangedInput(name)
        })

    }

    transferData(event) {
        const {name} = event.target
        this.setState({
            [name]: {
                ...this.state[name],
                text: this.props.post[name]
            }
        })
    }

    checkingChangedInput(nameInput) {
        if (this.isChanged(this.props.post[nameInput], this.state[nameInput])) {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: true
                }
            })
        } else {
            this.setState({
                [nameInput]: {
                    ...this.state[nameInput],
                    isChanged: false
                }
            })
        }
    }

    isChanged(prevValue, nextValue) {
        return prevValue !== nextValue
    }

    isValid(titleChanged, contentChanged) {
        return titleChanged || contentChanged
    }


    render() {
        const {title, content, isValid} = this.state
        const {history, updatePost, message} = this.props
        console.log(this.props.history);
        return (
            <div>
                <TextField
                    label="Click for update Title"
                    fullWidth
                    value={title.text}
                    variant="outlined"
                    margin="normal"
                    name="title"
                    onClick={this.transferData}
                    onChange={this.changeSomeInput}
                />
                <TextField
                    variant="outlined"
                    multiline
                    rows={6}
                    label="Click for update Content"
                    fullWidth
                    name="content"
                    onClick={this.transferData}
                    onChange={this.changeSomeInput}
                    value={content.text}
                    margin="normal"
                />
                <Button variant="contained" color="primary" disabled={!this.isValid(title.isChanged, content.isChanged)}
                        onClick={() => {
                            let title, content
                            if (this.state.title.isChanged) {
                                title = this.state.title.text
                            } else {
                                title = this.props.post.title
                            }
                            if (this.state.content.isChanged) {
                                content = this.state.content.text
                            } else {
                                content = this.props.post.content
                            }

                            updatePost({
                                _id: this.props.id,
                                titleUpdate: title,
                                contentUpdate: content
                            });
                        }}>Update post</Button>
                <Typography>{message}</Typography>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    id: state.postsReducer.updatePostID,
    post: state.postsReducer.post,
    message: state.postsReducer.updateMessage
})

const mapDispatchToProps = {
    changePostUpdate,
    updatePost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdatePost))
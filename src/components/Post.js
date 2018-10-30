import React, {Component} from 'react'

import {connect} from 'react-redux'

import {withStyles} from "@material-ui/core/styles"

import {getPost} from "../actionsCreators/postActions";

import {sendComment, getComments, deleteComment} from "../actionsCreators/commentActions";

import {
    Paper,
    Typography,
    CircularProgress,
    Avatar,
    TextField,
    Button
} from '@material-ui/core'

import {
    Delete
} from '@material-ui/icons'

const styles = theme => ({
    Post__Avatar: {
        width: 60,
        height: 60,
        margin: 4
    },
    Post__Paper: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    Post__Content: {
        width: '100%',
        marginBottom: 5
    },
    Post__Body: {
        width: '95%',
        border: '1px solid gray',
        padding: 10
    },
    Post__NewComment: {
        width: '97%',
        marginTop: 30,
        padding: 20
    },
    Post__Comment: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    Post__CommentAvatar: {
        width: 40,
        height: 40,
        margin: 4
    },
    Post__Comments: {
        marginTop: 10
    },
    Post__CommentDelete: {
        color: 'gray',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    Post_CommentContent: {
        flexGrow: 1
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
})

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            newComment: {
                isValid: false,
                text: ''
            }
        }
        this.changeInputComment = this.changeInputComment.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }

    isValid(valueInput) {
        return valueInput.length > 2
    }

    changeInputComment(event) {
        const {value} = event.target
        if (this.isValid(value)) {
            this.setState({
                newComment: {
                    isValid: true,
                    text: value
                }
            })
        } else {
            this.setState({
                newComment: {
                    isValid: false,
                    text: value
                }
            })
        }

    }

    componentDidMount() {
        const {getPost, getComments, id} = this.props
        getPost(id);
        getComments(id)
    }


    createFirstLetter(login) {
        return login.charAt(0)

    }

    createLastLetter(login) {
        let numberLastLetter = login.length - 1;
        return login.charAt(numberLastLetter);
    }

    clearInput() {
        this.setState({
            newComment: {
                isValid: false,
                text: ''
            }
        })
    }

    createColorFirstLetter(login) {
        let letter = this.createFirstLetter(login)
        return letter.charCodeAt()
    }

    createColorLastLetter(login) {
        let letter = this.createLastLetter(login)
        return letter.charCodeAt()
    }

    render() {
        const {
            isLoaded,
            commentsIsLoaded,
            classes,
            sendComment,
            id,
            comments,
            idAuthorComment,
            authorComment,
            deleteComment,
            commentLoaded
        } = this.props
        const {
            author_name,
            title,
            body
        } = this.props.post

        const {
            isValid,
            text
        } = this.state.newComment


        if (!isLoaded) {
            return <CircularProgress className={classes.progress}/>
        }

        return (
            <div>
                <Paper className={classes.Post__Paper}>
                    <Avatar
                        className={classes.Post__Avatar}
                        style={{'backgroundColor': `rgb(${this.createColorFirstLetter(author_name)},50,${this.createColorLastLetter(author_name)})`}}
                    >
                        {this.createFirstLetter(author_name)}{this.createLastLetter(author_name)}
                    </Avatar>
                    <div className={classes.Post__Content}>
                        <Typography variant="h4">{title}</Typography>
                        <Typography className={classes.Post__Body} vairant="h6">{body}</Typography>
                    </div>
                </Paper>
                <Paper className={classes.Post__Comments}>
                    <Typography variant="h4">Comments:</Typography>
                    {commentsIsLoaded
                        ? comments.map((comment) => {
                            return <Paper key={comment.id} className={classes.Post__Comment}>
                                <Avatar
                                    style={{'backgroundColor': `rgb(${this.createColorFirstLetter(comment.author_name)},50,${this.createColorLastLetter(comment.author_name)})`}}
                                    className={classes.Post__CommentAvatar}
                                >
                                    {this.createFirstLetter(comment.author_name)}{this.createLastLetter(comment.author_name)}
                                </Avatar>
                                <div className={classes.Post_CommentContent}>
                                    <Typography>{comment.author_name} say:</Typography>
                                    <Typography>{comment.body}</Typography>
                                </div>
                                {(author_name === authorComment || comment.author_name === authorComment)
                                    ? <Delete className={classes.Post__CommentDelete} onClick={() => {
                                        deleteComment(`comment/${comment.id}`, id)
                                    }}/>
                                    : null
                                }


                            </Paper>
                        })
                        : <CircularProgress/>}
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
                    <Button variant="contained" color="primary" disabled={!isValid}
                            onClick={() => {
                                sendComment({
                                    body: text,
                                    author_id: idAuthorComment,
                                    author_name: authorComment,
                                    post_id: id
                                }, id)
                                this.clearInput()
                            }}
                    >Send</Button>
                    {commentLoaded
                        ? null
                        : <CircularProgress className={classes.progress}/>}
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post: state.postReducer.post,
    id: state.postsReducer.updatePostID,
    isLoaded: state.postReducer.isLoaded,
    authorComment: state.authReducer.user.login,
    idAuthorComment: state.authReducer.user.id,
    comments: state.commentReducer.comments,
    commentsIsLoaded: state.commentReducer.isLoaded,
    commentLoaded: state.commentReducer.commentLoaded
})

const mapDispatchToProps = {
    getPost,
    sendComment,
    getComments,
    deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Post))
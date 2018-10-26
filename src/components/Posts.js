import React, {Component} from 'react'

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Divider,
    Avatar
} from '@material-ui/core'

import {Link} from 'react-router-dom'


import {
    ExpandMore,
    Delete,
    Brush,
    Send
} from '@material-ui/icons'

import {connect} from 'react-redux'

import {getPosts, deletePost, updatePost, changePost} from "../actionsCreators/postsActions";

import {dispatchUserID} from "../actionsCreators/accountActions";

import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    Posts__heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        borderRadius: '50%',
    },
    Posts__Avatar: {
        width: 60,
        height: 60,
        margin: 4
    },
    Posts__secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    Posts__Author: {
        fontSize: 18,
        color: 'gray'
    },
    Posts__Title: {
        fontSize: 20,
    },
    Post__Actions: {
        color: 'gray',
        cursor: 'pointer'
    },
    Post__EmptyMessage: {
        textAlign: 'center',
        fontSize: 32
    },
    Post__CategoryName: {
        color: 'gray',
        fontSize: 10
    },
    Post__Link :{
        textDecoration:'none'
    }
})

class Posts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            content: '',
            title: ''
        }
        this.checkAuthor = this.checkAuthor.bind(this)
    }

    componentDidMount() {
        this.props.getPosts()
    }

    checkAuthor(login, author) {
        return login === author
    }

    createFirstLetter(login) {
        return login.charAt(0)

    }

    createLastLetter(login) {
        let numberLastLetter = login.length - 1;
        return login.charAt(numberLastLetter);
    }


    render() {
        const {posts, classes, login, errorMessage} = this.props;
        const {title, content} = this.state

        if (posts.length === 0) {
            return <div>
                <Typography className={classes.Post__EmptyMessage}>
                    Простите но сейчас записей нет, но уверен скоро они появяться буд-то из ниоткуда)
                </Typography>
            </div>
        }

        return (
            <div>
                {posts.map((post) => {
                    return <ExpansionPanel key={post.id}><ExpansionPanelSummary expandIcon={
                        <ExpandMore/>
                    }>
                        <Link to={`/post/author/${post.author_id}`} className={classes.Post__Link} onClick={()=>{
                            this.props.dispatchUserID(post.author_id)
                        }}>
                            <div className={classes.Posts__heading}>
                                <Avatar
                                    className={classes.Posts__Avatar}>{this.createFirstLetter(post.author_name)}{this.createLastLetter(post.author_name)}</Avatar>
                            </div>
                        </Link>
                        <div className={classes.Posts__secondaryHeading}>
                            <div>
                                <Typography className={classes.Posts__Author}>{post.author_name}:</Typography>
                            </div>
                            <Typography
                                className={classes.Post__CategoryName}>Category: {post.category_name}</Typography>
                            <Typography className={classes.Posts__Title}>{post.title}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                        <Divider/> <ExpansionPanelDetails>
                            <Typography>{post.body}</Typography>
                        </ExpansionPanelDetails>
                        <Divider/>
                        <ExpansionPanelActions>
                            {this.checkAuthor(login, post.author_name)
                                ? <div>
                                    <Delete
                                        className={classes.Post__Actions}
                                        onClick={() => {
                                            this.props.deletePost(post.id)
                                        }}
                                    />
                                    <Link to='/updatePost'>
                                        < Brush
                                            className={classes.Post__Actions}
                                            onClick={() => {
                                                this.props.changePost(post.id);
                                            }}
                                        />
                                    </Link>
                                </div>
                                : null}
                            <Link to={`/post/${post.id}`}>
                                <Send
                                    onClick={() => {
                                        this.props.changePost(post.id)
                                    }}
                                    className={classes.Post__Actions}
                                />
                            </Link>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.postsReducer.posts,
    login: state.authReducer.user.login,
    errorMessage: state.postsReducer.errorMessage,
    updateStatusMessage: state.postsReducer.updateStatusMessage,
    id: state.postsReducer.updatePostID
});

const mapDispatchToProps = {
    getPosts,
    deletePost,
    updatePost,
    changePost,
    dispatchUserID
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts))
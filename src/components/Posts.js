import React, {Component} from 'react'

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Divider,
    Avatar,
    CircularProgress
} from '@material-ui/core'

import {Link} from 'react-router-dom'


import {
    ExpandMore,
    Delete,
    Brush,
    Send
} from '@material-ui/icons'

import {connect} from 'react-redux'

import {getPosts, deletePost, changePost} from "../actionsCreators/postsActions";

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
    Post__Link: {
        textDecoration: 'none'
    },
    Post__CircularProgress:{
        display:'flex',
        justifyContent:'center'
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
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


    createCollorFirst(login) {
        let letter = this.createFirstLetter(login)
        return letter.charCodeAt()
    }

    createCollorLast(login) {
        let letter = this.createLastLetter(login)
        return letter.charCodeAt()
    }

    render() {
        const {
            posts,
            classes,
            login,
            isLoaded,
            deletePost,
            changePost,
            deleteIsLoaded,
            postsCategoryIsLoaded
        } = this.props;

        if (!isLoaded || !postsCategoryIsLoaded) {
            return <CircularProgress className={classes.progress}/>
        }

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
                    const {
                        id,
                        title,
                        body,
                        category_name,
                        author_name,
                        author_id
                    } = post
                    return <ExpansionPanel key={id}><ExpansionPanelSummary expandIcon={
                        <ExpandMore/>
                    }>
                        <Link to={`/post/author/${author_id}`} className={classes.Post__Link} onClick={() => {
                            this.props.dispatchUserID(author_id)
                        }}>
                            <div className={classes.Posts__heading}>
                                <Avatar
                                    className={classes.Posts__Avatar}
                                    style={{'backgroundColor': `rgb(${this.createCollorFirst(author_name)},50,${this.createCollorLast(author_name)})`}}
                                >{this.createFirstLetter(author_name)}{this.createLastLetter(author_name)}</Avatar>
                            </div>
                        </Link>
                        <div className={classes.Posts__secondaryHeading}>
                            <div>
                                <Typography className={classes.Posts__Author}>
                                    {post.author_name}:
                                </Typography>
                            </div>
                            <Typography
                                className={classes.Post__CategoryName}>
                                Category: {category_name}
                            </Typography>
                            <Typography className={classes.Posts__Title}>{title}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                        <Divider/> <ExpansionPanelDetails>
                            <Typography>
                                {body}
                            </Typography>
                        </ExpansionPanelDetails>
                        <Divider/>
                        <ExpansionPanelActions>
                            {this.checkAuthor(login, post.author_name)
                                ? <div>
                                    {deleteIsLoaded
                                    ?null
                                    :<CircularProgress/>
                                    }
                                    <Delete
                                        className={classes.Post__Actions}
                                        onClick={() => {
                                            deletePost(`post/${id}`)
                                        }}
                                    />
                                    <Link to='/updatePost'>
                                        < Brush
                                            className={classes.Post__Actions}
                                            onClick={() => {
                                                changePost(id);
                                            }}
                                        />
                                    </Link>
                                </div>
                                : null}
                            <Link to={`/post/${id}`}>
                                <Send
                                    onClick={() => {
                                        changePost(id)
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
    updateStatusMessage: state.postsReducer.updateStatusMessage,
    id: state.postsReducer.updatePostID,
    isLoaded: state.postsReducer.isLoaded,
    deleteIsLoaded:state.postsReducer.deleteIsLoaded,
    postsCategoryIsLoaded:state.postsReducer.postsCategoryIsLoaded
});

const mapDispatchToProps = {
    getPosts,
    deletePost,
    changePost,
    dispatchUserID
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts))
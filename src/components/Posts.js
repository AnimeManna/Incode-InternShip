import React, {Component} from 'react'

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Divider
} from '@material-ui/core'

import {Link} from 'react-router-dom'

import {
    ExpandMore,
    Delete,
    Brush
} from '@material-ui/icons'

import {connect} from 'react-redux'

import {getPosts, deletePost, updatePost, changePost} from "../actionsCreators/postsActions";

import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
    Posts__heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
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
                    return <ExpansionPanel key={post._id}><ExpansionPanelSummary expandIcon={
                        <ExpandMore/>
                    }>
                        <div className={classes.Posts__heading}>
                            <div>
                                <Typography className={classes.Posts__Author}>{post.author}:</Typography>
                            </div>
                            <Typography className={classes.Posts__Title}>{post.title}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                        <Divider/> <ExpansionPanelDetails>
                            <Typography>{post.content}</Typography>
                        </ExpansionPanelDetails>
                        <Divider/>
                        {this.checkAuthor(login, post.author)
                            ?
                            <ExpansionPanelActions>
                                <Delete
                                    className={classes.Post__Actions}
                                    onClick={() => {
                                        this.props.deletePost(post._id)
                                    }}
                                />
                                <Link to='/updatePost'>
                                    <Brush
                                        className={classes.Post__Actions}
                                        onClick={()=>{
                                            this.props.changePost(post._id);
                                        }}
                                    />
                                </Link>
                            </ExpansionPanelActions>
                            : null}
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
    id:state.postsReducer.updatePostID
});

const mapDispatchToProps = {
    getPosts,
    deletePost,
    updatePost,
    changePost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Posts))
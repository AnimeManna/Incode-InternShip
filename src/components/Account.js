import React, {Component} from 'react'

import {Avatar, withStyles} from '@material-ui/core'

import {connect} from 'react-redux'

import {getUserPostsById} from "../actionsCreators/accountActions";

import {changePost, deletePost} from "../actionsCreators/postsActions";

import CreateNewPost from './CreateNewPost'

import {
    Brush,
    Delete,
    ExpandMore,
    Send
} from '@material-ui/icons'

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Divider,
    ExpansionPanelActions,
} from '@material-ui/core'
import {Link} from "react-router-dom";

const styles = theme => ({
    Account__Header: {
        display: 'flex'
    },
    Account__heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        borderRadius: '50%',
    },
    Account__secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    Account__Author: {
        fontSize: 18,
        color: 'gray'
    },
    Account__Title: {
        fontSize: 20,
    },

    Account__Avatar: {
        width: 60,
        height: 60,
        margin: 4
    },
    Account__CategoryName: {
        color: 'gray',
        fontSize: 10
    },
    Account__Actions: {
        color: 'gray',
        cursor: 'pointer'
    }
})

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: ''
        }
    }


    componentDidMount() {
        const {getUserPostsById} = this.props;
        const {id} = this.props.match.params;
        getUserPostsById(id);
    }


    createFirstLetter(login) {
        return login.charAt(0)

    }

    createLastLetter(login) {
        let numberLastLetter = login.length - 1;
        return login.charAt(numberLastLetter);
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
            posts,
            classes,
            userID,
            changePost,
            deletePost
        } = this.props;
        const {
            id
        } = this.props.match.params
        return (
            <div className={classes.Account}>
                <div className={classes.Account__Header}>
                    {(userID === id)
                        ? <CreateNewPost/>
                        : null}
                </div>
                {posts.map((post) => {
                    const {
                        title,
                        body,
                        author_name,
                        author_id,
                        category_name
                    } = post
                    return <ExpansionPanel key={post.id}
                                           className={classes.Account__Posts}>
                        <ExpansionPanelSummary expandIcon={
                            <ExpandMore/>
                        }>
                            <div
                                className={classes.Account__heading}>
                                <Avatar
                                    className={classes.Account__Avatar}
                                    style={{'backgroundColor': `rgb(${this.createColorFirstLetter(author_name)},50,${this.createColorLastLetter(author_name)})`}}
                                >{this.createFirstLetter(author_name)}{this.createLastLetter(author_name)}</Avatar>
                            </div>
                            <div className={classes.Account__secondaryHeading}>
                                <div>
                                    <Typography
                                        className={classes.Account__Author}
                                    >
                                        {author_name}:
                                    </Typography>
                                </div>
                                <Typography
                                    className={classes.Account__CategoryName}
                                >Category: {category_name}
                                </Typography>
                                <Typography
                                    className={classes.Account__Title}
                                >{title}
                                </Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <Divider/>
                        <ExpansionPanelDetails>
                            <Typography>
                                {body}
                            </Typography>
                        </ExpansionPanelDetails>
                        <ExpansionPanelActions>
                            {(id === author_id)
                                ? <div>
                                    <Delete
                                        className={classes.Account__Actions}
                                        onClick={() => {
                                            deletePost(`post/${post.id}`)
                                        }}
                                    />
                                    <Link to='/updatePost'>
                                        < Brush
                                            className={classes.Account__Actions}
                                            onClick={() => {
                                                changePost(post.id);
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
                                    className={classes.Account__Actions}
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
    posts: state.accountReducer.posts,
    userID: state.authReducer.user.id
})

const mapDispatchToProps = {
    getUserPostsById,
    changePost,
    deletePost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
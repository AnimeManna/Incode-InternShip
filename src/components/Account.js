import React, {Component} from 'react'

import {Avatar, withStyles} from '@material-ui/core'

import {connect} from 'react-redux'

import {getUserPostsById} from "../actionsCreators/accountActions";

import {
    ExpandMore
} from '@material-ui/icons'

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    Divider,
    ExpansionPanelActions,
} from '@material-ui/core'

const styles = theme => ({
    Account__Header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
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

    render() {
        const {posts, classes} = this.props;
        const {author} = this.state;
        console.log(this.props.match.params.id);
        console.log(author);
        console.log(this.props);
        console.log(posts);
        return (
            <div>
                <div className={classes.Account__Header}>
                </div>
                {posts.map((post) => {
                    return <ExpansionPanel key={post.id}>
                        <ExpansionPanelSummary expandIcon={
                            <ExpandMore/>
                        }>
                            <div className={classes.Account__heading}>
                                <Avatar
                                    className={classes.Account__Avatar}>{this.createFirstLetter(post.author_name)}{this.createLastLetter(post.author_name)}</Avatar>
                            </div>
                            <div className={classes.Account__secondaryHeading}>
                            <div>
                                <Typography className={classes.Account__Author}>{post.author_name}:</Typography>
                            </div>
                            <Typography
                                className={classes.Account__CategoryName}>Category: {post.category_name}</Typography>
                            <Typography className={classes.Account__Title}>{post.title}</Typography>
                        </div>
                        </ExpansionPanelSummary>
                        <Divider/>
                        <ExpansionPanelDetails>
                            <Typography>{post.body}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    posts: state.accountReducer.posts
})

const mapDispatchToProps = {
    getUserPostsById
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))
import React, {Component} from 'react'

import {connect} from 'react-redux'

import {withStyles} from "@material-ui/core/styles"

import {getPost} from "../actionsCreators/postActions";

const styles = theme =>({

})

class Post extends Component{

    componentDidMount(){
        const {getPost, id} = this.props
        getPost(id)
    }

    render(){
        console.log(this.props.id)
        console.log(this.props.post)
        return(
            <div>
                Hello Post
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    post:state.postReducer.post,
    id:state.postsReducer.updatePostID
})

const mapDispatchToProps = {
    getPost
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Post))
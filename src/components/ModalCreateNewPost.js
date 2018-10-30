import React, {Component} from 'react'

import {withStyles} from '@material-ui/core'

import {connect} from 'react-redux'

import CreateNewPost from './CreateNewPost'

import {closeModalNewPost} from "../actionsCreators/modalNewPostActions";

import {
    Dialog,
    DialogTitle
} from '@material-ui/core'

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
})

class modalCreateNewPost extends Component {
    render() {
        const {
            statusModal,
            closeModalNewPost,
            classes
        } = this.props
        console.log(statusModal)
        return (
            <Dialog
                onClose = {closeModalNewPost}
                open = {statusModal}
                aria-labelledby="simple-dialog-title"
            >
                <CreateNewPost/>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    statusModal: state.modalNewPostReducer.openModal
})

const mapDispatchToProps = {
    closeModalNewPost
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(modalCreateNewPost))
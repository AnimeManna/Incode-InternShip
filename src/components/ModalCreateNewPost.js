import React, {Component} from 'react'

import {connect} from 'react-redux'

import CreateNewPost from './CreateNewPost'

import {closeModalNewPost} from "../actionsCreators/modalNewPostActions";

import {
    Dialog
} from '@material-ui/core'


class modalCreateNewPost extends Component {
    render() {
        const {
            statusModal,
            closeModalNewPost
        } = this.props
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

export default connect(mapStateToProps, mapDispatchToProps)(modalCreateNewPost)
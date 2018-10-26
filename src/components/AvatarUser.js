import React, {Component} from 'react'

import {connect} from 'react-redux'

import {withStyles} from '@material-ui/core/styles'


import {
    Icon,
    Avatar
} from '@material-ui/core'

const styles = theme => ({
    avatar:{
        width:60,
        height:60,
        border:'4px,solid,gray',
        borderRadius:'50%'
    }

})

class AvatarUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstLetter: '',
            lastLetter: ''
        }
        this.getLetter = this.getLetter.bind(this)

    }

    getLetter() {
        const {login} = this.props
        let firstLetter = login.charAt(0);
        let numberLastLetter = login.length-1;
        let lastLetter = login.charAt(numberLastLetter)
        this.setState({
            firstLetter:firstLetter,
            lastLetter:lastLetter
        })
    }

    componentDidMount() {
        this.getLetter()
    }

    render() {
        const {classes} = this.props
        const {firstLetter, lastLetter} = this.state
        return (
            <div>
                <Avatar className={classes.avatar} size="normal" color="inherit">
                    {firstLetter}{lastLetter}
                </Avatar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.authReducer.user.login
})

export default connect(mapStateToProps)(withStyles(styles)(AvatarUser))
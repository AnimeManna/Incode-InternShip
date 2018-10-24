import React, {PureComponent} from 'react'

import './Home.css'

import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

import {logOut} from "../actionsCreators/logoutActions";


import {
    Paper,
    IconButton,
    Typography
} from '@material-ui/core'

import {
    ExitToApp
} from '@material-ui/icons'

class Home extends PureComponent {

    render() {
        return (
            <div className="Home">
                <Paper className="Home__Paper">
                    <Typography variant="h3" className="Home__Text">
                        Hello {this.props.user.login}, nice to meet you!
                    </Typography>
                    <Link to='/' className="Home__Icon" onClick={this.props.logOut}>
                        <IconButton>
                            <ExitToApp/>
                        </IconButton>
                    </Link>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user,
    isAuth: state.authReducer.success
})
const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
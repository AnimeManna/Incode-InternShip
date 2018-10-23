import React, {Component} from 'react'

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

class Home extends Component{
    render(){
        return(
            <div className="Home">
                <Paper className="Home__Paper">
                    <Typography variant="h3" className="Home__Text">
                        Hello user, nice to meet you!
                    </Typography>
                    <Link to='/' className="Home__Icon" onClick={this.props.logOut}>
                        <IconButton  >
                            <ExitToApp/>
                        </IconButton>
                    </Link>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    })
const mapDispatchToProps = {
    logOut
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
import React, {Component} from 'react'
import './Layout.css'

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import {
    Paper,
    Button,
    Typography
}
    from '@material-ui/core';

class Layout extends Component {
    render() {
        return (
            <div className="Layout">
                <Paper className="Layout__paper">
                    <Typography  className="Layout__title" variant ="h3">
                        Hello, are we familiar or are you not yet?
                    </Typography>
                    <div className='Layout__buttons'>
                        <Link to='/login' className="Layout__button">
                            <Button variant="contained" color="primary" >Are familiar</Button>
                        </Link>
                        <Link to='/register' className="Layout__button">
                            <Button variant="contained" color="primary" >Not yet</Button>
                        </Link>
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.loginReducer.isAuth
})

export default connect(mapStateToProps)(Layout)
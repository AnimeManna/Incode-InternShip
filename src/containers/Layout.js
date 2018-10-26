import React, {Component} from 'react'

import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

import axiosProviders from '../providers/axiosProvider'

import {
    Paper,
    Button,
    Typography
} from '@material-ui/core';

import {withStyles} from '@material-ui/core/styles'

const styles = () => ({
    Layout:{
        display:'flex',
        justifyContent:'center',
    },
    Layout__Paper:{
        width:'100%',
        height:400,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexWrap:'wrap'
    },
    Layout__Title:{
        textAlign:'center'
    },
    Layout__Buttons:{
        width:'100%',
        display:'flex',
        justifyContent:'space-around'
    },
    Layout__Button:{
        textDecoration:'none'
    }
})

class Layout extends Component {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.Layout}>
                <Paper className={classes.Layout__Paper}>
                    <Typography  className={classes.Layout__Title} variant ="h3">
                        Hello, are we familiar or are you not yet?
                    </Typography>
                    <div className={classes.Layout__Buttons}>
                        <Link to='/login' className={classes.Layout__Button}>
                            <Button variant="contained" color="primary" >Are familiar</Button>
                        </Link>
                        <Link to='/register' className={classes.Layout__Button}>
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

export default connect(mapStateToProps)(withStyles(styles)(Layout))
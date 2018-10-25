import React, {PureComponent} from 'react'

import {connect} from 'react-redux'

import {
    Paper,
    Typography
} from '@material-ui/core'

import {withStyles} from '@material-ui/core/styles'


const styles = () => ({
    Home:{
        display:'flex',
        justifyContent:'space-around'
    },
    Home__Paper:{
        width:'100%',
        height:400,
        padding:50,
        display:'flex',
        justifyContent: 'center',
        flexWrap:'wrap'
    },
    Home__Text:{
        textAlign:'center'
    },
    Home__Icon:{
        width:50,
        height:50,
        textDecoration:'none'
    }

})

class Home extends PureComponent {

    render() {
        const {classes} = this.props
        return (
            <div className={classes.Home}>
                <Paper className={classes.Home__Paper}>
                    <Typography variant="h3" className={classes.Home__Text}>
                        Hello {this.props.user.login}, nice to meet you!
                    </Typography>
                </Paper>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.authReducer.user
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home))
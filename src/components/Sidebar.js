import React, {Component} from 'react'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    Sidebar:{
        width:'20%',
        height:400,
        backgroundColor: theme.palette.background.paper
    }
})

class Sidebar extends Component{
    render(){
        const {classes} = this.props
        return(
            <div className={classes.Sidebar}>
                Hello sidebar
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar)
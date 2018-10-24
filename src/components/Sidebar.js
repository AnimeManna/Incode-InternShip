import React, {Component} from 'react'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    toolbar:theme.mixins.toolbar

})

class Sidebar extends Component{
    render(){
        const classes = this.props.classes;
        return(
            <div>
                Hello sidebar
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar)
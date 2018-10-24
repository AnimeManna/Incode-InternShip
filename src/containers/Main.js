import React, {Component} from 'react'

import App from './App'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

import {withStyles} from '@material-ui/core/styles'

const styles = theme  =>({
    toolbar:theme.mixins.toolbar

})

class Main extends Component {
    render(){
        const classes = this.props.classes;
        return(
            <div>
                <Header/>
                <div className={classes.toolbar}/>
                <Sidebar/>
                <App/>
            </div>
        )
    }
}

export default withStyles(styles)(Main)
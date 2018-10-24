import React, {Component} from 'react'

import {withStyles} from "@material-ui/core/styles"

import {
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core'

import {
    AccountCircle
} from '@material-ui/icons'

const styles = theme => ({
    button: {
        margin: 1
    }
})

class Header extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        Incode
                        <IconButton
                            aria-haspopup="true"
                            className={classes.button}
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header)
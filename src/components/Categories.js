import React,{Component} from 'react'

import axiosProviders from '../providers/axiosProvider'

import {connect} from 'react-redux'

import {getCategorys} from "../actionsCreators/categoryActions";

import {withStyles} from '@material-ui/core/styles'


import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    ExpansionPanelActions,
    Typography,
    Divider
} from '@material-ui/core'

const styles = theme  => ({
    Categories__heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
})

class Categories extends Component{

    componentDidMount(){
        this.props.getCategorys();
    }

    render(){
        console.log(this.props);
        return(
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                    </ExpansionPanelActions>
                </ExpansionPanel>
                Hello categories
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    getCategorys
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Categories))
import React, {Component} from 'react'

import {withStyles} from '@material-ui/core/styles'

import {
    Paper,
    TextField,
    Typography,
    Button
} from '@material-ui/core'

import {connect} from 'react-redux'

import {inputChanged, inputValid} from "../actionsCreators/InputActions";
import {sendNewPost} from "../actionsCreators/newPostActions";

const styles = theme => ({
    CreateNewPost: {},
    CreateNewPost__Paper: {
        width: '98%',
        height: 400,
        padding: 10
    },
    CreateNewPost__Text: {
        margin: 5,
        textAlign: 'center'
    },
    CreateNewPost__Title: {
        width: '95%',
        padding: 20
    },
    CreateNewPost__Content: {
        marginTop: 10,
        height: 300
    },
    CreateNewPost__Footer:{
        width:'100%',
        display:'flex',
        justifyContent:'flex-start'
    },
    CreateNewPost__ErrorMessage:{
        padding:7
    }
})

class CreateNewPost extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: {
                text: '',
                isValid: true,
                isChanged: false
            },
            content: {
                text: '',
                isValid: true,
                isChanged: false
            },
            isValid:false,
            isChanged:false
        }
        this.changeInputTitle = this.changeInputTitle.bind(this);
        this.changeInputContent = this.changeInputContent.bind(this);
        this.checkingInputValid = this.checkingInputValid.bind(this);
        this.checkValidStatus = this.checkValidStatus.bind(this);
        this.checkingInputChange = this.checkingInputChange.bind(this);
        this.checkChangedStatus = this.checkChangedStatus.bind(this)
    }

    changeInputTitle(event) {
        const {value, name} = event.target;
        this.checkingInputValid(name,value)
    }

    changeInputContent(event){
        const {value, name}  = event.target;
        this.checkingInputValid(name,value)
    }

    isValid(value){
        return value.length < 255 && value.length > 2
    }

    checkingInputValid(nameInput, valueInput){
        if(this.isValid(valueInput)){
            this.setState({
                [nameInput]:{
                    ...this.state[nameInput],
                    text:valueInput,
                    isValid:true
                }
            },()=>{
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput)
            })
        }else{
            this.setState({
                [nameInput]:{
                    ...this.state[nameInput],
                    text:valueInput,
                    isValid:false
                }
            },()=>{
                this.checkValidStatus()
                this.checkingInputChange(nameInput, valueInput)
            })
        }
    }

    checkValidStatus() {
        const {inputValid} = this.props
        const {content, title} = this.state;
        if (content.isValid && title.isValid) {
            this.setState({
                isValid: true
            }, () => {
                inputValid('NEWPOST', this.state.isValid)
            })
        } else {
            this.setState({
                isValid: false
            }, () => {
                inputValid('NEWPOST', this.state.isValid)
            })
        }
    }

    isChanged(value){
        return value.length > 0
    }

    checkingInputChange(nameInput, valueInput){
        if(this.isChanged(valueInput)){
            this.setState({
                [nameInput]:{
                    ...this.state[nameInput],
                    isChanged:true
                }
            },()=>{
                this.checkChangedStatus()
            })
        }else{
            this.setState({
                [nameInput]:{
                    ...this.state[nameInput],
                    isChanged:false
                }
            },()=>{
                this.checkChangedStatus()
            })
        }
    }

    checkChangedStatus(){
        const {inputChanged} = this.props
        const { title, content } = this.state
        if(title.isChanged && content.isChanged){
            this.setState({
                isChanged:true
            },()=>{
                inputChanged('NEWPOST', this.state.isChanged)
            })
        }else{
            this.setState({
                isChanged:false
            },()=>{
                inputChanged('NEWPOST', this.state.isChanged)
            })
        }
    }

    render() {
        console.log(localStorage.getItem("token"));
        const {classes, author, isValid, isChanged, sendNewPost, errorMessage} = this.props;
        const {title, content} = this.state
        return (
            <div>
                <Paper className={classes.CreateNewPost__Paper}>
                    <Typography variant="h2" className={classes.CreateNewPost__Text}>Write you new Post!</Typography>
                    <TextField
                        variant="outlined"
                        label="Title"
                        fullWidth
                        placeholder="Enter title your post"
                        margin="normal"
                        name='title'
                        onChange={this.changeInputTitle}
                        error={!title.isValid}
                    />
                    <TextField
                        variant="outlined"
                        label="Content"
                        fullWidth
                        placeholder="Enter a content your post"
                        multiline
                        rows="8"
                        margin="normal"
                        name='content'
                        onChange = {this.changeInputContent}
                        error={!content.isValid}
                    />
                    <div className={classes.CreateNewPost__Footer}>
                        <Button disabled={!isValid || !isChanged} variant="contained" color="primary" onClick={()=>{
                            sendNewPost({title:title.text,content:content.text,author})
                        }}>Send</Button>
                        <Typography className={classes.CreateNewPost__ErrorMessage} >{errorMessage}</Typography>
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    author: state.authReducer.user.login,
    isValid:state.newPostReducer.isValid,
    isChanged:state.newPostReducer.isChanged,
    errorMessage:state.newPostReducer.errorMessage
})

const mapDispatchTopProps = {
    inputValid,
    inputChanged,
    sendNewPost
}

export default connect(mapStateToProps, mapDispatchTopProps)(withStyles(styles)(CreateNewPost))
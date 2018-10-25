import axios from 'axios'

import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POSTS_START,
    DELETE_POST_ERROR,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    UPDATE_POST_ERROR,
    UPDATE_POST_START,
    UPDATE_POST_SUCCESS,
    CHANGE_POST_ERROR,
    CHANGE_POST_START,
    CHANGE_POST_SUCCESS,
    CHANGE_POST
} from "../actionTypes/actionTypes";


import {getUser} from "./authActions";

export const getPosts = () => {
    return async dispatch => {
        dispatch({type: GET_POSTS_START})
        const response = await axios.get('http://localhost:8000/getPosts');
        const {msg, success, posts} = response.data
        if (success) {
            dispatch({type: GET_POSTS_SUCCESS, payload: {posts, msg}})
        } else {
            dispatch({type: GET_POSTS_ERROR, payload: {msg}})
        }
    }
}

export const updatePost = (info) => {
    return async dispatch => {
        dispatch({type: UPDATE_POST_START});
        const response = await axios.post('http://localhost:8000/updatePost', {info});
        const {success, msg} = response.data
        if (success) {
            dispatch({type: UPDATE_POST_SUCCESS, payload: msg});
        } else {
            dispatch({type: UPDATE_POST_ERROR, payload: msg});
        }
    }
}

export const deletePost = (id) => {
    return async dispatch => {
        dispatch({type: DELETE_POST_START});
        const response = await axios.post('http://localhost:8000/deletePost', {_id: id});
        const {success, msg} = response.data;
        if (success) {
            dispatch({type: DELETE_POST_SUCCESS, payload: msg});
            getPosts()(dispatch);
        } else {
            dispatch({type: DELETE_POST_ERROR, payload: msg})
        }
    }
}

export const changePost = (id) => {
    return dispatch => {
        dispatch({type: CHANGE_POST, payload: id})
    }
}

export const changePostUpdate = (id) => {
    return async dispatch => {
        dispatch({type: CHANGE_POST_START})
        const response = await axios.post('http://localhost:8000/changePostUpdate', {_id: id})
        const {success, msg, post} = response.data
        if (success) {
            dispatch({type: CHANGE_POST_SUCCESS, payload: {msg, post}})
        } else {
            dispatch({type: CHANGE_POST_ERROR, payload: {msg}});
        }
    }
}
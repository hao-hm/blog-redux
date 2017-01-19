import * as constants from './posts-constants';
import axios from 'axios';

// Export Constants
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_END = 'REQUEST_END';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const CHANGE_MODE = 'CHANGE_MODE';
export const VIEW_MODE = 'VIEW_MODE';
export const CREATE_MODE = 'CREATE_MODE';
export const EDIT_MODE = 'EDIT_MODE';
export const SELECT = 'SELECT';

//common sync action
function requestStart() {
  return {
    type: REQUEST_START
  }
}

function requestEnd() {
  return {
    type: REQUEST_END
  }
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    error,
  };
}

//async action
//fetch posts
export function fetchPosts() {
  return (dispatch) => {
    dispatch(requestStart());
    return axios.get('/api/v1/posts')
      .then(res => dispatch(fetchPostsSuccess(res.data)))
      .catch(error => dispatch(requestError(error)))
      .then(()=> dispatch(requestEnd()));
  };
}
//sync action
//fetch posts success
export function fetchPostsSuccess(posts) {
  return {
    type: FETCH_SUCCESS,
    posts,
  };
}


//async action
//delete posts
export function deletePosts(id) {
  return (dispatch) => {
    dispatch(requestStart());
    return axios({
      method: 'delete',
      data: id,
      url: `/api/v1/posts/${id}`,
    })
      .then(res => {
        dispatch(deletePostsSuccess(res.data.id));
        dispatch(selectPosts([]));
      })
      .catch(error => dispatch(requestError(error)))
      .then(()=> dispatch(requestEnd()));
  };
}


//fetch posts success
export function deletePostsSuccess(id) {
  return {
    type: DELETE_SUCCESS,
    id,
  };
}


//Create
export function createPost(post) {
  return (dispatch) => {
    dispatch(requestStart());
    return axios({
      method: 'post',
      data: post,
      url: '/api/v1/posts',
    })
      .then(res => {
        dispatch(createSuccess(res.data));
        dispatch(changeMode(VIEW_MODE));
        dispatch(selectPosts([]));
      })
      .catch(error => dispatch(requestError(error)))
      .then(()=> dispatch(requestEnd()));
  }
}


export function createSuccess(post) {
  return {
    type: CREATE_SUCCESS,
    post,
  };
}

//Update
export function updatePost(post) {
  return (dispatch) => {
    dispatch(requestStart());
    return axios({
      method: 'put',
      data: post,
      url: `/api/v1/posts/${post.id}`,
    })
      .then(res => {
        dispatch(updateSuccess(res.data));
        dispatch(changeMode(VIEW_MODE));
        dispatch(selectPosts([]));
      })
      .catch(error => dispatch(requestError(error)))
      .then(()=> dispatch(requestEnd()));
  }
}


export function updateSuccess(post) {
  return {
    type: UPDATE_SUCCESS,
    post,
  };
}

//Change mode
export function changeMode(mode) {
  return {
    type: CHANGE_MODE,
    mode
  }
}

//Select Post
export function selectPosts(ids) {
  return {
    type: SELECT,
    ids
  }
}




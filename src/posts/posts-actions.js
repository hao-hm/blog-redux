import * as constants from './posts-constants';
import axios from 'axios';

export function fetchPosts() {
  // const request = fetch('posts')
  //   .then(function (response) {
  //     return response.json();
  //   });
  const request = axios.get('/api/v1/posts');
  return {
    type: constants.FETCH_POSTS,
    payload: request
  };
}

export function fetchPostsSuccess(posts) {
  return {
    type: constants.FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsFailure(error) {
  return {
    type: constants.FETCH_POSTS_FAILURE,
    payload: error
  };
}

//Create
export function createPost(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: '/api/v1/posts',
  });

  return {
    type: constants.CREATE_POST,
    payload: request
  };
}

export function createPostSuccess(newPost) {
  return {
    type: constants.CREATE_POST_SUCCESS,
    payload: newPost
  };
}

export function createPostFailure(error) {
  return {
    type: constants.CREATE_POST_FAILURE,
    payload: error
  };
}

export function resetNewPost() {
  return {
    type: constants.RESET_NEW_POST
  }
}

//Change mode
export function changeMode(mode) {
  return {
    type: constants.CHANGE_MODE,
    payload: mode
  }
}

//Delete
export function deletePosts(posts) {
  const request = axios({
    method: 'delete',
    data: posts,
    url: '/api/v1/posts',
  });

  return {
    type: constants.DELETE_POST,
    payload: request
  };
}

export function deletePostsSuccess(deletedPosts) {
  return {
    type: constants.DELETE_POST_SUCCESS,
    payload: deletedPosts
  };
}

export function deletePostsFailure(error) {
  return {
    type: constants.DELETE_POST_FAILURE,
    payload: error
  };
}

;

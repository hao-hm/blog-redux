import * as constants from './posts-constants';
import axios from 'axios';

export function fetchPosts() {
  // const request = fetch('posts')
  //   .then(function (response) {
  //     return response.json();
  //   });
  const request = axios.get('posts');
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
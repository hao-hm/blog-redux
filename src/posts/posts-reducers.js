import * as constants from './posts-constants';


const INITIAL_STATE = {
  postsList: {posts: [], error:null, loading: false},
  newPost:{post:{}, error: null, loading: false},
  editPost:{post:null, error:null, loading: false},
  deletePosts: {posts: null, error:null, loading: false},
  selectedPosts: [],
  currentPost: {},
  mode: constants.VIEW_MODE
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
    case constants.FETCH_POSTS:// start fetching posts and set loading = true
      return { ...state, postsList: {posts: action.payload, error: null, loading: true} };
    case constants.FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
      return { ...state, postsList: {posts: action.payload.data, error:null, loading: false} };
    case constants.FETCH_POSTS_FAILURE:// return error and make loading = false
      error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
      return { ...state, postsList: {posts: [], error: error, loading: false} };
    case constants.RESET_POSTS:// reset postList to initial state
      return { ...state, postsList: {posts: [], error:null, loading: false} };

    //create post
    case constants.CREATE_POST:
      return {...state, newPost: {...state.newPost, loading: true}};
    case constants.CREATE_POST_SUCCESS:
      return {...state, newPost: {post:action.payload.data, error:null, loading: false}};
    case constants.CREATE_POST_FAILURE:
      error = action.payload || {message: action.payload.message};
      return {...state, newPost: {post:null, error:error, loading: false}};
    case constants.RESET_NEW_POST:
      return {...state,  newPost:{post:null, error:null, loading: false}};


    //delete post
    case constants.DELETE_POST:
      return {...state, deletePosts: {...state.deletePosts, loading: true}};
    case constants.DELETE_POST_SUCCESS:
      return {...state, deletePosts: {posts:action.payload.data, error:null, loading: false}};
    case constants.DELETE_POST_FAILURE:
      error = action.payload || {message: action.payload.message};
      return {...state, deletePosts: {posts:null, error:error, loading: false}};
    case constants.RESET_DELETED_POST:
      return {...state,  deletePosts:{posts:null, error:null, loading: false}};


    //change mode
    case constants.CHANGE_MODE:
      return {
        ...state,
        mode: action.payload
      };

     //select posts
    case constants.SELECT_POSTS:
      return {
        ...state,
        selectedPosts: [...action.payload]
      };
    
    default:
      return state;
  }
}


// Get all posts
export const getPosts = state => state.posts.postsList.posts;

// Get post by id
export const getPost = (state, id) => state.posts.postsList.posts.filter(post => post.id === id)[0];
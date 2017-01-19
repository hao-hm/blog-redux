import * as constants from './posts-constants';
import {
  REQUEST_START, REQUEST_ERROR, REQUEST_END,
  FETCH_SUCCESS, DELETE_SUCCESS, CREATE_SUCCESS, UPDATE_SUCCESS,
  CHANGE_MODE, VIEW_MODE, SELECT
} from './posts-actions';

const INITIAL_STATE = {
  posts: [],
  loading: 0,
  error: '',
  selectedIds: [],
  current: null,
  mode: VIEW_MODE
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_START:
      return {...state, loading: state.loading + 1 };
    case REQUEST_ERROR :
      return {...state, error: action.error};
    case REQUEST_END:
      return {...state, loading: state.loading - 1};


    case FETCH_SUCCESS:
      return {...state, posts: action.posts};
    case DELETE_SUCCESS:
      return {...state, posts: state.posts.filter(post => post.id !== action.id)};
    case CREATE_SUCCESS:
      return {...state, posts: [...state.posts, action.post]};
    case UPDATE_SUCCESS:
      return {...state, posts: [...state.posts.filter(post => post.id !== action.id), action.post]};


    //change mode
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.mode
      };

    //select posts
    case SELECT:
      return {
        ...state,
        selectedIds: [...action.ids],
        current: state.posts.find(post => post.id === action.ids[0])
      };

    default:
      return state;
  }
}


// Get all posts
export const findAll = state => state.postModule.posts;

// Get post by id
export const find = (state, id) => state.postModule.posts.find(post => post.id === id);

export const getCurrentMode = (state) => state.postModule.mode;
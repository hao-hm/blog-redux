import React, { Component } from 'react';
import {connect} from 'react-redux'
import PostList from './PostList'
import PostForm from './PostForm'
import {CREATE_MODE, EDIT_MODE} from './posts-constants';

class PostIndex extends Component {
  render() {
    let mode =  this.props.mode;
    switch (mode){
      case CREATE_MODE:
        return <PostForm />;
      case EDIT_MODE:
        return <PostForm />;
      default:
        return <PostList />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.posts.mode
  };
};

const PostPage = connect(mapStateToProps)(PostIndex);
export default PostPage;
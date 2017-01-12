import React, { Component } from 'react';
import {connect} from 'react-redux'
import PostList from './PostList'
import PostForm from './PostForm'
import PostToolbar from './PostToolbar'
import {CREATE_MODE, EDIT_MODE} from './posts-constants';

class PostIndex extends Component {
  renderContent() {
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
  render(){
    return (
      <div>
        <PostToolbar/>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mode: state.posts.mode
  };
};

const PostPage = connect(mapStateToProps)(PostIndex);
export default PostPage;
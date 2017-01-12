import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getPost} from './posts-reducers'

class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1>Detail</h1>
        Title: {this.props.currentPost.title}
        Body: {this.props.currentPost.body}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    currentPost: getPost(state, props.params.id)
  };
};

const PostDetailPage = connect(mapStateToProps)(Detail);
export default PostDetailPage;
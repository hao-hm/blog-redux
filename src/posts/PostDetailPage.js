import React, { Component } from 'react';
import {connect} from 'react-redux'
import {find} from './posts-reducers'

class Detail extends Component {
  render() {
    return(
      <div>
        <h1>Detail</h1>
        Title: {this.props.current.title}
        Body: {this.props.current.body}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    current: find(state, props.params.id)
  };
};

const PostDetailPage = connect(mapStateToProps)(Detail);
export default PostDetailPage;
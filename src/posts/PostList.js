import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {fetchPosts, fetchPostsSuccess, fetchPostsFailure, changeMode} from './posts-actions';
import * as constants from './posts-constants';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link style={{color:'black'}} to={"posts/" + post.id}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
        </li>
      );
    });
  }

  onCreateClick = ()=> {
    this.props.changeMode(constants.CREATE_MODE);
  };

  onEditClick = ()=> {
    this.props.changeMode(constants.EDIT_MODE);
  };


  render() {
    const {posts, loading, error} = this.props.postsList;
    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }

    return (
      <div className="container">
        <h1>Posts</h1>
        <div className="control is-grouped">
          <p className="control">
            <button onClick={this.onCreateClick} className="button is-primary">Create</button>
          </p>
          <p className="control">
            <button onClick={this.onEditClick} className="button is-primary">Edit</button>
          </p>
        </div>
        <ul className="list-group">
          {this.renderPosts(posts)}
        </ul>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    postsList: state.posts.postsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
        !response.error ? dispatch(fetchPostsSuccess(response.payload)) : dispatch(fetchPostsFailure(response.payload));
      });
    },
    changeMode: (mode) => {
      dispatch(changeMode(mode))
    }
  }
};
const PostList = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostList;
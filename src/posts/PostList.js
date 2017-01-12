import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {fetchPosts, fetchPostsSuccess, fetchPostsFailure, changeMode} from './posts-actions';
import * as constants from './posts-constants';
import {List, ListItem} from 'material-ui/List';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <Link to={`/post/${post.id}`} key={post.id} >
          <ListItem value={post.id} primaryText={post.title}/>
        </Link>

      );
    });
  }

  render() {
    const {posts, loading, error} = this.props.postsList;

    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }
    return (
      <List>
        {this.renderPosts(posts)}
      </List>
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
import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {fetchPosts, fetchPostsSuccess, fetchPostsFailure, changeMode, selectPosts} from './posts-actions';
import * as constants from './posts-constants';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '600px',
    };
  }
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (

        <TableRow key={post.id} selected={post.selected}>
          <TableRowColumn>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </TableRowColumn>
          <TableRowColumn>{post.body}</TableRowColumn>
        </TableRow>

      );
    });
  }

  onRowSelection = (selection)=>{
    const selectedIds = [];
    if(Array.isArray(selection)){
      selection.forEach((index) => {
        let post = this.props.postsList.posts[index];
        selectedIds.push(post.id);
      })
    }
    this.props.selectPosts(selectedIds);
  };

  render() {
    const {posts, loading, error} = this.props.postsList;

    if (loading) {
      return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
    } else if (error) {
      return <div className="alert alert-danger">Error: {error.message}</div>
    }
    return (
      <Table  height={this.state.height}
              fixedHeader={this.state.fixedHeader}
              fixedFooter={this.state.fixedFooter}
              selectable={this.state.selectable}
              multiSelectable={this.state.multiSelectable}
              onRowSelection={this.onRowSelection}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Body</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {this.renderPosts(posts)}
        </TableBody>
      </Table>
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
    },
    selectPosts: (ids)=>{
      dispatch(selectPosts(ids))
    }
  }
};
const PostList = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostList;
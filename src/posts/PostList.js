import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as actions from './posts-actions';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      showCheckboxes: true,
      height: '600px'
    };
  }
  componentWillMount() {
    this.props.actions.fetchPosts();
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
        let post = this.props.posts[index];
        selectedIds.push(post.id);
      })
    }
    this.props.actions.selectPosts(selectedIds);
  };

  render() {
    const {posts} = this.props;
    return (
      <Table {...this.state} onRowSelection={this.onRowSelection}>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Body</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {this.renderPosts(posts)}
        </TableBody>
      </Table>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    posts: state.postModule.posts
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const PostList = connect(mapStateToProps, mapDispatchToProps)(Posts);
export default PostList;
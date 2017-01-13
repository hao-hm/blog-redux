import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux'
import {fetchPosts, changeMode, selectPosts} from './posts-actions';
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
        let post = this.props.posts[index];
        selectedIds.push(post.id);
      })
    }
    this.props.selectPosts(selectedIds);
  };

  render() {
    const {posts} = this.props;
    return (
      <Table  height={this.state.height}
              fixedHeader={this.state.fixedHeader}
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
    posts: state.postModule.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts());
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
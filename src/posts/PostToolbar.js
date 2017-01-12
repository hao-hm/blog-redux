import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import * as constants from './posts-constants';
import {deletePosts, deletePostsSuccess, deletePostsFailure, changeMode} from './posts-actions';

class PToolbar extends Component {

  onCreateClick = ()=> {
    this.props.changeMode(constants.CREATE_MODE);
  };

  onEditClick = ()=> {
    this.props.changeMode(constants.EDIT_MODE);
  };

  onDeleteClick = ()=> {
    this.props.deletePosts(this.props.selectedPosts[0]);
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Post"/>
          <FlatButton label="Create" onTouchTap={this.onCreateClick}/>
          <FlatButton label="Edit" onTouchTap={this.onEditClick} disabled={this.props.selectedPosts.length !== 1}/>
          <FlatButton label="Delete" onTouchTap={this.onDeleteClick} disabled={this.props.selectedPosts.length !== 1}/>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedPosts: state.posts.selectedPosts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePosts: (posts) => {
      dispatch(deletePosts(posts)).then((response) => {
        !response.error ? dispatch(deletePostsSuccess(response.payload)) : dispatch(deletePostsFailure(response.payload));
      });
    },
    changeMode: (mode) => {
      dispatch(changeMode(mode))
    }
  }
};
const PostToolbar = connect(mapStateToProps, mapDispatchToProps)(PToolbar);
export default PostToolbar;
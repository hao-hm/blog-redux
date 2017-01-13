import React, {Component} from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import * as constants from './posts-constants';
import {deletePosts, changeMode} from './posts-actions';

class PToolbar extends Component {

  onCreateClick = ()=> {
    this.props.changeMode(constants.CREATE_MODE);
  };

  onEditClick = ()=> {
    this.props.changeMode(constants.EDIT_MODE);
  };

  onDeleteClick = ()=> {
    this.props.deletePosts(this.props.selectedIds[0]);
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Post"/>
          <FlatButton label="Create" onTouchTap={this.onCreateClick}/>
          <FlatButton label="Edit" onTouchTap={this.onEditClick} disabled={this.props.selectedIds.length !== 1}/>
          <FlatButton label="Delete" onTouchTap={this.onDeleteClick} disabled={this.props.selectedIds.length !== 1}/>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedIds: state.postModule.selectedIds
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePosts: (id) => {
      dispatch(deletePosts(id));
    },
    changeMode: (mode) => {
      dispatch(changeMode(mode))
    }
  }
};
const PostToolbar = connect(mapStateToProps, mapDispatchToProps)(PToolbar);
export default PostToolbar;
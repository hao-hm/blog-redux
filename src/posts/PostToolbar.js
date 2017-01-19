import React, {Component} from 'react';
import {RaisedButton, IconButton, Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui';
import {connect} from 'react-redux';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from './posts-actions';
import {deletePosts, changeMode} from './posts-actions';

class PToolbar extends Component {

  onCreateClick = ()=> {
    this.props.changeMode(CREATE_MODE);
  };

  onEditClick = ()=> {
    this.props.changeMode(EDIT_MODE);
  };

  onDeleteClick = ()=> {
    this.props.deletePosts(this.props.selectedIds[0]);
  };

  render() {
    return (
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Post"/>
        </ToolbarGroup>
        {this.props.mode ===VIEW_MODE &&(
          <ToolbarGroup>
            <RaisedButton label="Create" onTouchTap={this.onCreateClick}/>
            <RaisedButton label="Edit" onTouchTap={this.onEditClick} disabled={this.props.selectedIds.length !== 1}/>
            <RaisedButton label="Delete" onTouchTap={this.onDeleteClick} disabled={this.props.selectedIds.length !== 1 || this.props.loading > 0}/>
          </ToolbarGroup>
        )}

      </Toolbar>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedIds: state.postModule.selectedIds,
    mode: state.postModule.mode,
    loading : state.postModule.loading
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
import React, {Component} from 'react';
import {connect} from 'react-redux'
import {CircularProgress} from 'material-ui';

class Loading extends Component {
  render() {
    return (
      <div style={{position: 'absolute'}}>
        {this.props.loading ? <CircularProgress /> : ''}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.postModule.loading
  };
};

const PostLoading = connect(mapStateToProps)(Loading);
export default PostLoading;
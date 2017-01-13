import React, {Component} from 'react';
import {connect} from 'react-redux'
import LinearProgress from 'material-ui/LinearProgress';

class Loading extends Component {
  render() {
    return (
      <div>
        {this.props.loading ? <LinearProgress mode="indeterminate"/> : ''}
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
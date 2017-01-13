import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createPost, updatePost, changeMode} from './posts-actions';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from './posts-constants';
import {RaisedButton, TextField} from 'material-ui'

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = this.isEdit() ? this.props.current : {title: '', body: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isCreate = ()=> {
    return this.props.mode === CREATE_MODE;
  };

  isEdit = ()=> {
    return this.props.mode === EDIT_MODE;
  };


  handleSubmit(e) {
    e.preventDefault();
    if (this.isCreate()) {
      this.props.createPost(this.state);
    } else {
      this.props.updatePost(this.state);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCancelClick = ()=> {
    this.props.changeMode(VIEW_MODE);
  };


  render() {
    return (
      <from onSubmit={this.handleSubmit}>
        <TextField value={this.state.title} onChange={this.handleChange} name="title" hintText="Title"
                   floatingLabelText="Title"/>
        <br/>
        <TextField value={this.state.body} onChange={this.handleChange} name="body" hintText="Body"
                   floatingLabelText="Body"/>
        <hr/>
        <div>
          <RaisedButton label={this.isCreate() ? "Create" : "Update"} primary={true} onTouchTap={this.handleSubmit}
                        style={{margin: 12}}/>
          <RaisedButton label="Cancel" onTouchTap={this.onCancelClick}/>
        </div>
      </from>
    );
  }
}

const mapStateToProps = (state) => ({
  current: state.postModule.current,
  mode: state.postModule.mode
});

///PostForm Container
const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => {
      dispatch(createPost(post));
    },
    updatePost: (post) => {
      dispatch(updatePost(post));
    },
    changeMode: (mode) => {
      dispatch(changeMode(mode))
    }
  }
};
const PostForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default PostForm;
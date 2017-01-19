import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from './posts-actions';
import {VIEW_MODE, CREATE_MODE, EDIT_MODE} from './posts-constants';
import {RaisedButton, TextField, Card, CardHeader, CardActions, CardText, CardTitle} from 'material-ui'

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
      this.props.actions.createPost(this.state);
    } else {
      this.props.actions.updatePost(this.state);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onCancelClick = ()=> {
    this.props.actions.changeMode(VIEW_MODE);
    this.props.actions.selectPosts([]);
  };


  render() {
    return (
      <from onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title={this.isCreate() ? "Create Post" : "Update Post"}/>
          <CardText>
            <TextField value={this.state.title} onChange={this.handleChange} name="title" hintText="Title"
                       floatingLabelText="Title"/>
            <br/>
            <TextField value={this.state.body} onChange={this.handleChange} name="body" hintText="Body"
                       floatingLabelText="Body"/>
          </CardText>
          <CardActions>
            <RaisedButton label={this.isCreate() ? "Create" : "Update"} primary={true} onTouchTap={this.handleSubmit}/>
            <RaisedButton label="Cancel" onTouchTap={this.onCancelClick}/>
          </CardActions>
        </Card>
      </from>
    );
  }
}

const mapStateToProps = (state) => ({
  current: state.postModule.current,
  mode: state.postModule.mode
});

///PostForm Container
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions,dispatch)
});
const PostForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default PostForm;
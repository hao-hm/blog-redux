import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createPost, createPostSuccess, createPostFailure} from './posts-actions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost(this.state);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    return (
      <from className="box" onSubmit={this.handleSubmit}>
        <label className="label">Title</label>
        <p className="control">
          <input value={this.state.title} className="input" name="title" type="text" placeholder="Title" onChange={this.handleChange}/>
        </p>
        <label className="label">Body</label>
        <p className="control">
          <textarea value={this.state.body} className="textarea" name="body"  placeholder="Body" onChange={this.handleChange}></textarea>
        </p>
        <hr/>
        <div className="control is-grouped">
          <p className="control">
            <button type="submit" onClick={this.handleSubmit} className="button is-primary">Submit</button>
          </p>
          <p className="control">
            <button className="button is-link">Cancel</button>
          </p>
        </div>
      </from>
    );
  }
}

///PostForm Container
const mapStateToProps = (state) => {
  return {
    newPost: state.posts.newPost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (props) => {
      dispatch(createPost(props)).then((response) => {
        !response.error ? dispatch(createPostSuccess(response.payload)) : dispatch(createPostFailure(response.payload));
      });
    }
  }
};
const PostForm = connect(mapStateToProps, mapDispatchToProps)(Form);
export default PostForm;
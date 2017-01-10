import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import PostList from './posts/PostList';
import PostForm from './posts/PostForm';
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import NotFoundPage from './not-found/NotFoundPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="blog" component={PostList}/>
    <Route path="blog/new" component={PostForm} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
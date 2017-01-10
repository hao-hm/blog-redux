import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import PostPage from './posts/PostPage';
import PostForm from './posts/PostForm';
import HomePage from './home/HomePage'
import AboutPage from './about/AboutPage'
import NotFoundPage from './not-found/NotFoundPage'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="blog" component={PostPage}/>
    <Route path="blog/new" component={PostForm} />
    <Route path="about" component={AboutPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
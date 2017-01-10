import React, { Component, PropTypes } from 'react';
import {Header, Footer} from './layout';

class App extends Component {
  render() {
    return (
      <section className="hero is-fullheight is-default is-bold">
        <Header />
        <div className="hero-body">
          <div className="container">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;

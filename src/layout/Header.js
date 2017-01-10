import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import logo from './logo.svg';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="hero-head">
        <div className="container">
          <nav className="nav has-shadow">
            <div className="container">
              <div className="nav-left">
                <a className="nav-item" href="">
                  <img src={logo} alt="Description" className="App-logo" />
                </a>
              </div>
              <span className="nav-toggle">
              <span></span>
              <span></span>
              <span></span>
            </span>
              <div className="nav-right nav-menu">

                <IndexLink to="/" className="nav-item is-tab" activeClassName="is-active">
                  Home
                </IndexLink>

                <Link to="/blog" className="nav-item is-tab" activeClassName="is-active">
                  Posts
                </Link>
                <Link to="/about" className="nav-item is-tab" activeClassName="is-active">
                  About
                </Link>
                <span className="nav-item">
              <Link className="button">
                Log in
              </Link>
              <Link className="button is-info">
                Sign up
              </Link>
            </span>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;

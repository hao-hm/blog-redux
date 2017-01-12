import React, {Component} from 'react';
import {Link, IndexLink} from 'react-router';
import logo from './logo.svg';
import './Header.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <header>
        <AppBar title={<span>Blog</span>}
                onLeftIconButtonTouchTap={this.handleToggle}
                iconElementRight={<FlatButton label="Login" />}
        />
        <Drawer containerStyle={{top: 64}}
                open={this.state.open}>
          <IndexLink to="/" activeClassName="active">
            <MenuItem onTouchTap={this.handleClose}>Home</MenuItem>
          </IndexLink>
          <Link to="/post" activeClassName="active">
            <MenuItem onTouchTap={this.handleClose}>Post</MenuItem>
          </Link>
        </Drawer>
      </header>
    );
  }
}

export default Header;

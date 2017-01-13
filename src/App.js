import React, { Component, PropTypes } from 'react';
import {Header/*, Footer*/} from './layout';
//material-ui
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <Header />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;

import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import RightContent from "./Components/RightContent";
import theme from "./theme.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      selectedIndex: 0
    };
  }

  render() {
    const value = this.state.selectedIndex;
    const dir = theme.direction;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div dir={theme.direction}>
            <CssBaseline />
            <RightContent />
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(theme)(App);

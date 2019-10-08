import { createMuiTheme, withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  fontFamily: ["Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
  palette: {
    primary: {
      main: "#00665e"
    },
    secondary: {
      main: "#f9be00"
    }
  },
  overrides: {
    LeftNav: {
      drawerDiv: {
        backgroundColor: "#00665e",
        width: 300
      }
    }
  },
  direction: "ltr",
  typography: {
    useNextVariants: true
  }
});

export default theme;

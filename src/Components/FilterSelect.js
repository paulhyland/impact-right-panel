import React from "react";
import PropTypes from "prop-types";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Select, { components } from "react-select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import classNames from "classnames";
import FilterTags from "../Data/FilterTags";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    color: "black",
    zIndex: 1000
  },
  optionFont: {
    fontFamily: theme.typography.fontFamily,
    "&:hover": {
      color: "#333"
    }
  },
  formControl: {
    margin: 0,
    width: "100%",
    color: "#fff",
    backgroundColor: "#999"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  inputLabel: {
    color: "#fff",
    "&$inputFocused": {
      color: "#fff"
    }
  },
  inputFocused: {}
});

const customStyles = {
  container: (base, state) => ({
    ...base,
    opacity: state.isDisabled ? ".5" : "1"
  }),
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "#fff",
    backgroundColor: "#999",
    borderRadius: 0,
    border: 0,
    borderColor: state.isFocused ? "#666e76" : "#666e76",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#333" : "#333"
    }
  }),
  placeholder: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    color: "#fff"
  }),
  option: (provided, state) => ({
    ...provided,

    borderRadius: 0,
    backgroundColor: state.isFocused ? "rgba(249,206,0,0.3)" : "#efefef",
    ":active": {
      backgroundColor: "#efefef"
    }
  }),
  menu: base => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
    hyphens: "auto",
    // kill the gap
    marginTop: 0,
    textAlign: "left",
    // prevent menu to scroll y
    wordWrap: "break-word"
  }),
  menuList: base => ({
    ...base,
    // kill the white space on first and last option
    padding: 0
  }),
  multiValue: base => ({
    ...base,
    borderRadius: 12
  }),
  multiValueRemove: base => ({
    ...base,
    color: "#333",
    ":hover": {
      backgroundColor: "#666",
      color: "white",
      borderRadius: "0 12px 12px 0"
    }
  })
};

class FilterSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    tags: [],
    displayThumbnails: true
  };

  handleChange = inputValue => {
    let temp = [];
    inputValue.map(value => temp.push(value));
    this.setState({ tags: temp });
    this.setState({ displayThumbnails: true });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <div className={classes.search}>
          <FormControl className={classes.formControl}>
            <InputLabel
              htmlFor="tags"
              classes={{
                root: classes.inputLabel,
                focused: classes.inputFocused
              }}
            >
              Tags
            </InputLabel>
            <Input
              inputComponent={Select}
              inputProps={{
                isMulti: true,
                options: FilterTags,
                placeholder: "Select tags...", // I NEED to declarate placeholder as blank string
                name: "tags",
                label: "Tags",
                id: "tags",
                styles: customStyles,
                className: classes.optionFont,
                onChange: this.handleChange
              }}
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

FilterSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterSelect);

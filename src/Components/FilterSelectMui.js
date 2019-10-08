import * as React from "react";
import PropTypes from "prop-types";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import { TagsSelect } from "react-select-material-ui";

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
    backgroundColor: "#999",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    },
    color: "#333",
    zIndex: 1000
  },
  optionFont: {
    fontFamily: theme.typography.fontFamily,
    "&:hover": {
      color: "#333",
      backgroundColor: "#999"
    }
  }
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
    color: "#fff",
    borderRadius: 5,
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
  })
};

const options = [
  { value: "engagement", label: "Engagement" },
  { value: "enrollment", label: "Enrollment" },
  { value: "Retention", label: "Retention" },
  { value: "student_success", label: "Student Success" },
  { value: "strategic_planning", label: "Strategic Planning" }
];

class FilterSelectMui extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <div className={classes.search}>
          <TagsSelect
            label="Tags"
            options={options}
            onChange={this.handleChange}
            SelectProps={{
              msgNoOptionsAvailable: "All tags are selected",
              msgNoOptionsMatchFilter: "No tag matches the filter"
            }}
            styles={customStyles}
            className={classes.optionFont}
          />
        </div>
      </div>
    );
  }

  handleChange = (values: string[]) => {
    console.log(values);
  };
}

FilterSelectMui.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterSelectMui);

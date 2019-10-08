import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Thumbnail from "./Thumbnail";
import ReportsData from "../Data/ReportsData";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#eee",
    height: "100%"
  },
  grow: {
    flexGrow: 1
  },
  gridContainer: {
    margin: "36px 24px"
  }
});

class Thumbnails extends React.Component {
  constructor(props) {
    super(props);
  }

  selectedIndex = value => {
    this.props.selectedIndex(value);
  };

  setSelected = value => {
    this.props.setSelected(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.gridContainer}>
        <Grid container spacing={24} justify="space-evenly">
          {ReportsData.map((reportData, index) => {
            const isSelected = index == this.props.selectedIndex;
            if (reportData.tags.includes("engagement")) {
              return (
                <Thumbnail
                  reportData={reportData}
                  selectedIndex={this.props.selectedIndex}
                  setSelected={this.setSelected.bind(this)}
                />
              );
            }
          })}
        </Grid>
      </div>
    );
  }
}

Thumbnails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Thumbnails);

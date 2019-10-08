import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import FilterIcon from "@material-ui/icons/FilterList";
import ThumbnailsIcon from "@material-ui/icons/CollectionsOutlined";
import ReportIcon from "@material-ui/icons/ImageOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import classNames from "classnames";
import Thumbnails from "./Thumbnails";
import Report from "./Report";
import FilterSelect from "./FilterSelect";
import FilterSelectMui from "./FilterSelectMui";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#eee",
    height: "100%"
  },
  grow: {
    flexGrow: 1
  },
  contentArea: {
    display: "flex",
    height: "100%"
  },
  topBar: {
    height: "40px",
    minHeight: "40px",
    backgroundColor: "#ccc"
  },
  searchBox: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 0
  },
  iconButton: {
    padding: 8
  },
  lightTooltip: {
    backgroundColor: "#eee",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 10,
    margin: 0
  },
  filterSection: {
    flexGrow: 1,
    visibility: "visible",
    backgroundColor: "#999",
    fontSize: ".95em",
    padding: theme.spacing.unit * 3,
    position: "relative",
    display: "none"
  },
  thumbColumn: {
    width: 272,
    backgroundColor: "#aaa"
  }
});

class RightContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2,
      displayReport: true,
      viewState: "quarter"
    };
  }

  handleThumbnailClick(index) {
    this.setState({ selectedIndex: index });
    this.setState({ displayReport: true });
  }

  handleFilterClick() {
    if (document.getElementById("filterSection").style.display !== "block") {
      document.getElementById("filterSection").style.display = "block";
    } else {
      document.getElementById("filterSection").style.display = "none";
    }
  }

  handleDisplayClick() {
    const displayReport = this.state.displayReport;
    this.setState({ displayReport: !displayReport });
  }

  render() {
    const { classes } = this.props;
    const { displayReport } = this.state;
    const { viewState } = this.state;
    const { filterTags } = this.state;

    let reportHint = "View Report";

    if (displayReport) {
      reportHint = "View Thumbnails";
    }

    return (
      <div className={classes.root}>
        <div className={classes.grow}>
          <AppBar position="relative">
            <Toolbar className={classes.topBar}>
              <Paper className={classes.searchBox} elevation={0}>
                <InputBase className={classes.grow} />
                <Tooltip
                  title="Filter"
                  placement="bottom"
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <IconButton
                    className={classes.iconButton}
                    aria-label="Filter"
                    onClick={this.handleFilterClick}
                  >
                    <FilterIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title={reportHint}
                  placement="bottom"
                  classes={{ tooltip: classes.lightTooltip }}
                >
                  <IconButton
                    className={classes.iconButton}
                    aria-label={reportHint}
                    disabled={!this.state.selectedIndex}
                  >
                    {this.state.displayReport ? (
                      <ThumbnailsIcon
                        onClick={this.handleDisplayClick.bind(this)}
                      />
                    ) : (
                      <ReportIcon
                        onClick={this.handleDisplayClick.bind(this)}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              </Paper>
            </Toolbar>
          </AppBar>
        </div>

        <div className={classes.filterSection} id="filterSection">
          <FilterSelect />
        </div>

        {displayReport && viewState == "half" ? (
          <Report selectedIndex={this.state.selectedIndex} />
        ) : displayReport && viewState == "quarter" ? (
          <div className={classes.contentArea}>
            <div className={classes.grow}>
              <Report selectedIndex={this.state.selectedIndex} />
            </div>
            <div className={classes.thumbColumn}>
              <Thumbnails
                selectedIndex={this.state.selectedIndex}
                onClick={index => this.handleThumbnailClick(index)}
              />
            </div>
          </div>
        ) : (
          <Thumbnails
            selectedIndex={this.state.selectedIndex}
            onClick={index => this.handleThumbnailClick(index)}
          />
        )}
      </div>
    );
  }
}

RightContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RightContent);

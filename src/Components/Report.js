import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SvgIcon from "@material-ui/core/SvgIcon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ArrowExpandLeft from "mdi-material-ui/ArrowExpandLeft";
import ArrowCollapseRight from "mdi-material-ui/ArrowCollapseRight";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import Notes from "@material-ui/icons/Notes";
import Comments from "@material-ui/icons/ChatBubbleOutline";
import Ratings from "@material-ui/icons/BallotOutlined";
import Close from "@material-ui/icons/Close";
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
  reportPanel: {
    margin: "24px 24px",
    position: "relative"
  },
  reportOverlay: {
    flexGrow: 1,
    position: "relative",
    backgroundColor: "#aacbc8",
    margin: 0,
    width: "100%",
    visibility: "visible",
    display: "none"
  },
  textOverlay: {
    margin: 0,
    padding: 24,
    borderRadius: 0,
    backgroundColor: "#aacbc8"
  },
  fullSizeImage: {
    width: "100%"
  },
  topText: {
    marginLeft: 8,
    flexGrow: 1
  },
  reportTop: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    borderRadius: 0
  },
  openButton: {
    padding: 8,
    margin: 0,
    borderRadius: 0,
    backgroundColor: "#ccc",
    boxShadow:
      "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px - 2px rgba(0, 0, 0, 0.12)"
  },
  iconButton: {
    padding: 8,
    margin: 0,
    borderRadius: 0,
    backgroundColor: "#ccc"
  },
  iconList: {
    padding: 0
  },
  iconListItem: {
    padding: "8px 0px"
  },
  lightTooltip: {
    backgroundColor: "#eeeeee",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 10,
    margin: 10
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "8px"
  },
  svgIcon: {
    fontWeight: 900,
    color: "#000"
  },
  menuPaper: {
    borderRadius: 0,
    borderWidth: 0
  }
});

class Report extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.viewState,
      viewState: props.viewState
    };
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };

  handleExpandCollapse = () => {
    const currentViewState = this.state.viewState;
    currentViewState == "half"
      ? this.setState(state => ({ viewState: "threeQuarters" }))
      : this.setState(state => ({ viewState: "half" }));
    this.props.setViewState();
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.setState({ viewState: value });
    this.props.setViewState();
  };

  setViewState = () => {
    this.setState({
      viewState: this.state.viewState
    });
  };

  handleClick() {
    if (document.getElementById("instructions").style.visibility == "hidden") {
      document.getElementById("instructions").style.visibility = "visible";
    } else {
      document.getElementById("instructions").style.visibility = "hidden";
    }
  }

  handleDescription() {
    if (document.getElementById("description").style.display !== "block") {
      document.getElementById("description").style.display = "block";
    } else {
      document.getElementById("description").style.display = "none";
    }
  }

  handleInstructionsOpen = event => {
    this.setState({ open: false });
    this.setState(state => ({ instructions: true }));

    document.getElementById("instructions").style.display = "block";
    document
      .getElementById("menuTip")
      .setAttribute("title", "Close Instructions");
  };

  handleInstructionsClose = event => {
    document.getElementById("instructions").style.display = "none";
    this.setState(state => ({ open: !state.open }));
    this.setState(state => ({ instructions: false }));
  };

  render() {
    const { classes } = this.props;
    const { instructions } = this.state;
    const { open } = this.state;
    const { viewState } = this.state;
    const ReportData = ReportsData[this.props.selectedIndex];

    return (
      <div className={classes.root}>
        <div className={classes.reportPanel}>
          <div className={classes.reportTop} elevation={0}>
            <Typography variant="body2" className={classes.topText}>
              The menu on the right enables you to read more about the selected
              report, rate it, or leave a comment.
              <br />
            </Typography>
            <Paper className="classes.menuPaper">
              <Tooltip
                title={
                  instructions
                    ? "Close Instructions"
                    : open
                    ? "Close Menu"
                    : "Open Menu"
                }
                placement="left"
                classes={{ tooltip: classes.lightTooltip }}
              >
                <IconButton
                  className={classes.openButton}
                  aria-label={
                    instructions
                      ? "Close Instructions"
                      : open
                      ? "Close Menu"
                      : "Open Menu"
                  }
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={
                    instructions
                      ? "Close Instructions"
                      : open
                      ? "Close Menu"
                      : "Open Menu"
                  }
                  aria-haspopup="true"
                  onClick={this.handleInstructionsClose}
                >
                  {instructions ? (
                    <InfoOutlined />
                  ) : open ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </IconButton>
              </Tooltip>
            </Paper>
          </div>

          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper className="classes.menuPaper">
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList className={classes.iconList}>
                      <Tooltip
                        title={
                          viewState == "half"
                            ? "Expand Panel"
                            : "Collapse Panel"
                        }
                        placement="left"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <MenuItem
                          onClick={this.handleExpandCollapse}
                          className={classes.iconListItem}
                        >
                          <ListItemIcon
                            className={classes.iconButton}
                            aria-label={
                              viewState == "half"
                                ? "Expand Panel"
                                : "Collapse Panel"
                            }
                            aria-owns={
                              viewState == "half"
                                ? "Expand Panel"
                                : "Collapse Panel"
                            }
                          >
                            {viewState == "half" ? (
                              <ArrowExpandLeft />
                            ) : (
                              <ArrowCollapseRight />
                            )}
                          </ListItemIcon>
                        </MenuItem>
                      </Tooltip>

                      <Tooltip
                        title="Instructions"
                        placement="left"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <MenuItem
                          onClick={this.handleInstructionsOpen}
                          className={classes.iconListItem}
                        >
                          <ListItemIcon className={classes.iconButton}>
                            <InfoOutlined />
                          </ListItemIcon>
                        </MenuItem>
                      </Tooltip>

                      <Tooltip
                        title="Description"
                        placement="left"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.iconListItem}
                        >
                          <ListItemIcon className={classes.iconButton}>
                            <Notes />
                          </ListItemIcon>
                        </MenuItem>
                      </Tooltip>

                      <Tooltip
                        title="Rate/Comment"
                        placement="left"
                        classes={{ tooltip: classes.lightTooltip }}
                      >
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.iconListItem}
                        >
                          <ListItemIcon className={classes.iconButton}>
                            <SvgIcon
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 25.1 25.1"
                              className={classes.svgIcon}
                            >
                              <g>
                                <path
                                  class="st0"
                                  d="M21.9,2.2H3.1c-1.2,0-2.3,1.2-2.3,2.6v12c0,1.4,1,2.6,2.3,2.6h12.2l2.2,4.9c0.1,0.1,0.2,0.2,0.3,0.2
		s0.3-0.1,0.3-0.2l2.2-4.9h1.6c1.2,0,2.3-1.2,2.3-2.6v-12C24.2,3.4,23.2,2.2,21.9,2.2z M23.5,16.8c0,1-0.7,1.8-1.5,1.8h-1.9
		c-0.1,0-0.3,0.1-0.3,0.2l-1.9,4.4l-1.9-4.4c-0.1-0.1-0.2-0.2-0.3-0.2H3.1c-0.9,0-1.5-0.8-1.5-1.8v-12c0-1,0.7-1.8,1.5-1.8h18.8
		c0.9,0,1.5,0.8,1.5,1.8V16.8z"
                                />
                                <path
                                  class="st1"
                                  d="M10.6,12.1l1.8-1.8c0.1-0.1,0.1-0.3,0.1-0.4c0-0.1-0.2-0.2-0.3-0.3L9.6,9.2L8.5,6.9c-0.1-0.3-0.6-0.3-0.7,0
		L6.7,9.2L4.1,9.6C4,9.6,3.9,9.7,3.8,9.9c0,0.1,0,0.3,0.1,0.4l1.8,1.8l-0.4,2.6c0,0.1,0,0.3,0.2,0.4c0.1,0.1,0.3,0.1,0.4,0l2.3-1.2
		l2.3,1.2c0.1,0,0.1,0,0.2,0c0.1,0,0.2,0,0.2-0.1C11,15,11,14.8,11,14.7L10.6,12.1z M10.1,14l-1.8-0.9c-0.1,0-0.1,0-0.2,0
		c-0.1,0-0.1,0-0.2,0L6.2,14l0.3-2c0-0.1,0-0.3-0.1-0.3L5,10.3L7,10c0.1,0,0.2-0.1,0.3-0.2l0.9-1.8L9,9.8C9.1,9.9,9.2,10,9.3,10
		l2,0.3l-1.4,1.4c-0.1,0.1-0.1,0.2-0.1,0.3L10.1,14z"
                                />
                                <path
                                  class="st0"
                                  d="M20.7,5.9h-6.9c-0.1,0-0.3,0.2-0.3,0.4c0,0.2,0.1,0.4,0.3,0.4h6.9c0.1,0,0.3-0.2,0.3-0.4
		C20.9,6.1,20.8,5.9,20.7,5.9z"
                                />
                                <path
                                  class="st0"
                                  d="M20.7,8.9h-5.8c-0.1,0-0.3,0.2-0.3,0.4c0,0.2,0.1,0.4,0.3,0.4h5.8c0.1,0,0.3-0.2,0.3-0.4
		C20.9,9.1,20.8,8.9,20.7,8.9z"
                                />
                                <path
                                  class="st0"
                                  d="M20.7,12h-5.8c-0.1,0-0.3,0.2-0.3,0.4s0.1,0.4,0.3,0.4h5.8c0.1,0,0.3-0.2,0.3-0.4S20.8,12,20.7,12z"
                                />
                                <path
                                  class="st0"
                                  d="M20.7,14.9h-6.9c-0.1,0-0.3,0.2-0.3,0.4s0.1,0.4,0.3,0.4h6.9c0.1,0,0.3-0.2,0.3-0.4S20.8,14.9,20.7,14.9z"
                                />
                              </g>
                            </SvgIcon>
                          </ListItemIcon>
                        </MenuItem>
                      </Tooltip>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <div className={classes.reportOverlay} id="description">
            <Paper className={classes.textOverlay}>
              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {ReportData.description}
              </Typography>
            </Paper>

            <div className={classes.grow} />

            <IconButton
              color="inherit"
              className={classes.closeButton}
              aria-label="Close"
              onClick={this.handleDescriptionClose}
            >
              <Close />
            </IconButton>
          </div>
          <div className={classes.reportOverlay} id="instructions">
            <Paper className={classes.textOverlay}>
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>

              <Typography variant="body2" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Rhoncus dolor purus non enim praesent elementum facilisis leo
                vel. Risus at ultrices mi tempus imperdiet. Semper risus in
                hendrerit gravida rutrum quisque non tellus. Convallis convallis
                tellus id interdum velit laoreet id donec ultrices. Odio morbi
                quis commodo odio aenean sed adipiscing.
              </Typography>
            </Paper>
            <div className={classes.grow} />
            <IconButton
              color="inherit"
              className={classes.closeButton}
              aria-label="Close"
              onClick={this.handleInstructionsClose}
            >
              <Close />
            </IconButton>
          </div>

          <img
            src={"/images/" + ReportData.image + ".png"}
            className={classes.fullSizeImage}
          />
        </div>
      </div>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Report);

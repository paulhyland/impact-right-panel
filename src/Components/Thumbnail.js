import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import Fade from "@material-ui/core/Fade";
import classNames from "classnames";

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
  },
  gridItem: {
    margin: 12,
    position: "relative"
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    width: 224,
    color: theme.palette.text.secondary,
    borderWidth: 2,
    borderColor: theme.palette.primary.main
  },
  thumbTitle: {
    textAlign: "left",
    paddingLeft: theme.spacing.unit,
    height: 22
  },
  thumbSource: {
    textAlign: "left",
    paddingLeft: theme.spacing.unit,
    display: "inline-flex",
    flexGrow: 1
  },
  thumbDate: {
    textAlign: "right",
    paddingRight: theme.spacing.unit,
    display: "inline-flex"
  },
  caption: {
    display: "flex",
    justifyContent: "space-between"
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: theme.spacing.unit,
    backgroundColor: "#666",
    color: "#eee"
  },
  overlayTitle: {
    textAlign: "left",
    color: "#eee",
    paddingLeft: theme.spacing.unit,
    lineHeight: 1.3,
    marginBottom: 5
  },
  overlayDivider: {
    color: "#eee",
    borderWidth: 1,
    borderStyle: "solid",
    marginBottom: 4
  },
  overlayDescription: {
    textAlign: "left",
    color: "#eee",
    paddingLeft: theme.spacing.unit,
    marginBottom: 4
  },
  overlaySource: {
    textAlign: "left",
    color: "#eee",
    paddingLeft: theme.spacing.unit,
    display: "inline-flex",
    flexGrow: 1
  },
  overlayDate: {
    textAlign: "right",
    color: "#eee",
    paddingRight: theme.spacing.unit,
    display: "inline-flex"
  }
});

class Thumbnail extends React.Component {
  constructor(props) {
    super(props);

    let selected = false;
    if (props.index == props.selectedIndex) {
      selected = true;
    }

    this.state = {
      hover: false,
      selected: selected
    };
  }

  handleChange = () => {
    this.setState(state => ({ hover: !state.hover }));
  };

  handleClick = () => {
    this.setState(state => ({ selected: true }));
  };

  handleClick = index => {
    this.setState({ selected: true });
    this.props.selectedIndex(this.props.index);
  };

  render() {
    const { classes } = this.props;
    const { hover } = this.state;

    return (
      <div className={classes.gridItem}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            className={classes.paper}
            onMouseOver={this.handleChange}
            onMouseOut={this.handleChange}
            onClick={this.handleClick.bind(this)}
            style={{
              borderStyle: this.state.selected ? "solid" : "none"
            }}
          >
            <img
              src={"/images/" + this.props.reportData.image + "_Thumb.png"}
              width={200}
              alt={this.props.reportData.title}
            />
            <Typography
              variant="body2"
              component="h3"
              noWrap
              className={classes.thumbTitle}
            >
              {this.props.reportData.title}
            </Typography>
            <div className={classes.caption}>
              <Typography
                variant="caption"
                component="p"
                className={classes.thumbSource}
              >
                {this.props.reportData.source}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                className={classes.thumbDate}
              >
                {this.props.reportData.date}
              </Typography>
            </div>

            <Fade in={hover}>
              <div className={classes.overlay}>
                <Typography
                  variant="body2"
                  component="h3"
                  className={classes.overlayTitle}
                >
                  {this.props.reportData.title}
                </Typography>

                <Divider variant="middle" className={classes.overlayDivider} />

                <Typography
                  variant="caption"
                  component="p"
                  className={classes.overlayDescription}
                >
                  {this.props.reportData.description}
                </Typography>
              </div>
            </Fade>
          </Paper>
        </Grid>
      </div>
    );
  }
}

Thumbnail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Thumbnail);

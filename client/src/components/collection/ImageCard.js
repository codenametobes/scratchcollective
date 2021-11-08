import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  card: {
    display: "flex",
    maxWidth: 450,
    height: "auto",
    margin: "0px",
    alignContent: "center",
    overflow: "hidden",
  },
  media: {
    height: "40vh",
    display: "flex",
    alignItems: "flex-end",
    paddingBottom: "40%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#2D2C2C",
    zIndex: -1,
  },
  desc: {
    color: "#2D2C2C",
  },
  creator: {
    color: "#2D2C2C",
    fontWeight: "bold",
    textAlign: "center",
  },
  creatorLink: {
    color: "#555555",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    background: "none",
    boxShadow: "none",
  },
});

// can add description to art destructuring if you need
const ImageCard = ({ art }) => {
  const classes = useStyles();
  const history = useHistory();
  const { imgUrl, name, originalCreator, scratchCollectiveId } = art;
  const [hoverOn, setHoverOn] = useState(false);

  const toggleHoverOn = () => {
    setHoverOn(true);
  };

  const toggleHoverOff = () => {
    setHoverOn(false);
  };

  return (
    <Card
      className={classes.card}
      onMouseOver={toggleHoverOn}
      onMouseLeave={toggleHoverOff}
      onClick={() => history.push(`/view/${scratchCollectiveId}`)}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={!hoverOn && imgUrl}
          title={name}
        >
          <Box className={classes.content}>
            <Collapse timeout={1280} in={hoverOn}>
              <Box className={classes.content}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {name}
                </Typography>
              </Box>
            </Collapse>
            <Collapse timeout={1280} in={hoverOn}>
              <Box className={classes.content}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.creator}
                >
                  Creator:
                </Typography>
              </Box>
            </Collapse>

            <Collapse timeout={850} in={hoverOn}>
              <Box className={classes.content}>
                <Link
                  className={classes.creatorLink}
                  onClick={() => {
                    history.push(`/profile/${originalCreator}`);
                  }}
                >
                  {originalCreator}
                </Link>
              </Box>
            </Collapse>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;

import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Card";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";

import doge from "../../assets/doge3.PNG";

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
    paddingBottom: "35%",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "#2D2C2C",
    zIndex: -1,
  },
  desc: {
    color: "#555555",
    fontSize: "0.7rem",
    textAlign: "center",
  },
  content: {
    background: "none",
    boxShadow: "none",
  },
  contentButton: {
    background: "none",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    marginTop: 5,
  },
  borderBox: {
    background: "none",
    boxShadow: "none",
    border: "0.5px grey",
  },
});

const MintOwn = ({ art }) => {
  const classes = useStyles();
  const history = useHistory();
  const [hoverOn, setHoverOn] = useState(false);

  const toggleHoverOn = () => {
    setHoverOn(true);
  };

  const toggleHoverOff = () => {
    setHoverOn(false);
  };

  const handleCreate = () => {
    history.push("/create");
  };

  return (
    <Card
      className={classes.card}
      onMouseOver={toggleHoverOn}
      onMouseLeave={toggleHoverOff}
    >
      <CardActionArea>
        <CardMedia className={classes.media} image={hoverOn && doge}>
          <Box className={classes.content}>
            <Box className={classes.content}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.title}
              >
                CREATE &amp; MINT YOUR OWN
              </Typography>
              <Typography className={classes.desc}>
                IT'S EASY. WE'LL WALK YOU THROUGH IT
              </Typography>
            </Box>

            <Collapse timeout={1280} in={hoverOn}>
              <Box className={classes.contentButton}>
                <Button
                  variant="contained"
                  color="secondary"
                  m={2}
                  onClick={handleCreate}
                >
                  Start
                </Button>
              </Box>
            </Collapse>
          </Box>
        </CardMedia>
      </CardActionArea>
    </Card>
  );
};

export default MintOwn;

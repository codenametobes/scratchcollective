import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, CssBaseline, Button } from "@material-ui/core";

import ImageCard from "./LandingImageCard";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "#ffffff",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    color: "#2D2C2C",
    fontSize: "2.4rem",
    cursor: "default",
  },
  bodyText: {
    fontSize: "1rem",
    cursor: "default",
  },
  goDown: {
    color: "#2D2C2C",
    fontSize: "2.5rem",
  },
  scrollText: {
    fontSize: "0.7rem",
    cursor: "pointer",
  },
  colorText: {
    color: "#6d28b1",
    fontSize: "1.3rem",
    cursor: "default",
  },
  bodyStructure: {
    width: "65%",
  },
  boldText: {
    fontWeight: "bold",
    cursor: "default",
  },
  linkText: {
    cursor: "pointer",
    color: "#6d28b1",
    fontSize: "1.3rem",
  },
  clickHere: {
    color: "#000000",
    cursor: "default",
  },
  linkLarge: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: "1.3rem",
    cursor: "pointer",
  },
}));

const PageOne = () => {
  const classes = useStyles();
  const history = useHistory();
  const [collectionData, setCollectionData] = useState([]);
  const [popUp, setPopUp] = useState(false);

  const onMouseOver = (event) => {
    const el = event.target;
    let colorhex = [
      "#7AF377",
      "#3498DB",
      "#F1C530",
      "#F29C29",
      "#8E44AD",
      "#4AA086",
      "#E74C3C",
      "#65CC71",
      "#D3541B",
      "#EB4367",
      "#74F7D9",
      "#DDA8FC",
    ];
    el.style.color = colorhex[Math.floor(Math.random() * 12)];
  };

  const onMouseOverClickHere = (event) => {
    const el = event.target;
    let colorhex = [
      "#7AF377",
      "#3498DB",
      "#F1C530",
      "#F29C29",
      "#8E44AD",
      "#4AA086",
      "#E74C3C",
      "#65CC71",
      "#D3541B",
      "#EB4367",
      "#74F7D9",
      "#DDA8FC",
    ];
    el.style.color = colorhex[Math.floor(Math.random() * 12)];
    setPopUp(true);
  };

  const onMouseOutClickHere = (event) => {
    const el = event.target;
    let white = "#000000";
    el.style.color = white;
    setPopUp(false);
  };

  const onMouseOutFAQ = (event) => {
    const el = event.target;
    let purple = "#6d28b1";
    el.style.color = purple;
  };

  useEffect(() => {
    const getCollection = async () => {
      await fetch(`/api/view/collection`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setCollectionData(data))
        .catch(() => {
          console.log("did not receive collection data");
        });
    };

    getCollection();
  }, []);

  const testCollection = collectionData.map((art) => (
    <Box
      display="flex"
      border="0px grey"
      // alignItems="center"
      justifyContent="center"
      key={art.scratchCollectiveId}
    >
      <ImageCard art={art} key={art.scratchCollectiveId} />
    </Box>
  ));

  return (
    <div className={classes.root} id="page-1">
      <CssBaseline />
      <Box textAlign="center" className={classes.bodyStructure}>
        <Box>
          <Box mt={0}>
            <Typography className={classes.title}>HOW IT WORKS</Typography>
          </Box>
          <Box mt={2}>
            <Typography className={classes.bodyText}>
              <span className={classes.colorText}> ScratchCollective App </span>{" "}
              provides a simple-to-use{" "}
              <span>AI Art-Generation tool and NFT minting pipeline.</span>
              <br />
              All that's required are ✅two cool images and a ✅a bit of ETH to
              have our{" "}
              <span className={classes.colorText}>
                AI generation tools
              </span>{" "}
              create and send your masterpiece to the{" "}
              <span className={classes.colorText}>Ethereum</span> blockchain as
              a sellable NFT!
            </Typography>
          </Box>
          <Box marginTop={2}>
            <Typography className={classes.bodyText}>
              You can also use our app to{" "}
              <span className={classes.colorText}> mint your own images</span>{" "}
              as NFTs.
              <br />
              Either way using our tools will allow you have an NFT to own or{" "}
              <span className={classes.colorText}>
                {" "}
                sell on marketplaces like OpenSea or Rarible.
              </span>
            </Typography>
          </Box>
          <Box marginTop={2} marginBottom={4}>
            <Typography className={classes.bodyText}>
              Check out our{" "}
              <span
                className={classes.linkText}
                onMouseEnter={(event) => onMouseOver(event)}
                onMouseOut={(event) => onMouseOutFAQ(event)}
                onClick={() => window.open("/about", "_self")}
              >
                {" "}
                FAQ Page{" "}
              </span>{" "}
              to see how it works, or{" "}
              <span
                className={classes.clickHere}
                onMouseEnter={(event) => onMouseOverClickHere(event)}
                onMouseOut={(event) => onMouseOutClickHere(event)}
              >
                click "Get Started"{" "}
              </span>{" "}
              (below) to see the minting process firsthand.
              <br />
              Make sure to have Metamask installed and connected!
              <br />
            </Typography>
          </Box>
        </Box>

        {testCollection.length > 0 ? (
          <Slide
            easing="ease"
            duration={5000}
            transitionDuration={1000}
            autoplay={true}
            slidesToShow={testCollection.length >= 5 ? 5 : 1}
          >
            {testCollection}
          </Slide>
        ) : (
          <Box
            display="flex"
            border="0px grey"
            // alignItems="center"
            justifyContent="center"
          >
            <Typography className={classes.bioText}>
              Our artists are still in the middle of their creative process! (No
              art yet)
            </Typography>
          </Box>
        )}

        {!popUp && (
          <Box mt={4}>
            {" "}
            <Button
              variant="contained"
              onClick={() => history.push("/create")}
              style={{
                width: "750px",
              }}
              color="primary"
              size="large"
            >
              GET STARTED!
            </Button>
          </Box>
        )}
        {popUp && (
          <Box mt={4}>
            {" "}
            <Button
              variant="contained"
              onClick={() => history.push("/create#createMint")}
              style={{
                backgroundColor: "#00dfad",
                width: "750px",
              }}
              size="large"
            >
              RIGHT HERE!
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PageOne;

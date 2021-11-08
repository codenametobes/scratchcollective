import React from "react";
import { useHistory } from "react-router-dom";

import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
    fontSize: ".75vw",
    color: "#F3F3F3",
  },
  left: {
    width: "40%",
    fontWeight: "bold",
    color: "#F3F3F3",
    whiteSpace: "noWrap",
  },
  right: {
    color: "#aaaaaa",
    overflow: "hidden",
    maxWidth: "50%",
    width: "50%",
    cursor: "pointer",
  },
}));

const DescriptionTable = ({
  ipfsImgUri,
  tokenUri,
  scratchCollectiveId,
  originalCreator,
  txHash,
  creationDate,
}) => {
  const classes = useStyles();
  const history = useHistory();

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

  const onMouseOut = (event) => {
    const el = event.target;
    let white = "#FFFFFF";
    el.style.color = white;
  };

  return (
    <Box className={classes.root} sx={{ overflow: "hidden" }}>
      <tr>
        <td className={classes.left}>ID:</td>
        <td className={classes.right}>{scratchCollectiveId}</td>
      </tr>
      {}
      <tr>
        <td className={classes.left}>Original Creator:</td>
        <td
          className={classes.right}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
          onClick={() => history.push(`/profile/${originalCreator}`)}
        >
          {originalCreator}
        </td>
      </tr>
      <tr>
        <td className={classes.left}>Created On:</td>
        <td className={classes.right}>{creationDate}</td>
      </tr>
      <tr>
        <td className={classes.left}>MetaData URI:</td>
        <td
          className={classes.right}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
          onClick={() => window.open(tokenUri, "_blank")}
        >
          {tokenUri}
        </td>
      </tr>
      <tr>
        <td className={classes.left}>IPFS Image URI:</td>
        <td
          className={classes.right}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
          onClick={() => window.open(ipfsImgUri, "_blank")}
        >
          {ipfsImgUri}
        </td>
      </tr>
      <tr>
        <td className={classes.left}>Tx Hash:</td>
        <td
          className={classes.right}
          onMouseEnter={(event) => onMouseOver(event)}
          onMouseOut={(event) => onMouseOut(event)}
          onClick={() =>
            window.open(`https://rinkeby.etherscan.io/tx/${txHash}`, "_blank")
          }
        >
          {txHash}
        </td>
      </tr>
    </Box>
  );
};

export default DescriptionTable;

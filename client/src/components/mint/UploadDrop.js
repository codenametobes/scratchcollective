import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Typography, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  plusSign: {
    fontSize: "4.5rem",
  },
  dropZoneTitle: {
    fontSize: "2rem",
    margin: "0 auto",
    paddingTop: "2rem",
    marginLeft: 100,
    color: "#000000",
    cursor: "default",
  },
  fileNameTitle: {
    textDecoration: "underline",
    fontSize: "0.5rem",
    color: "#921100",
    margin: "0 auto",
  },
  root: {
    display: "flex",
    border: "dotted",
    borderRadius: "5%",
    marginBottom: 1,
    minHeight: 150,
    minWidth: 350,
    MaxHeight: 300,
    MaxWidth: 400,
    height: 300,
    width: "auto",
    boxSizing: "content-box",
    justifyContent: "center",
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  placeholderBoxBase: {
    display: "flex",
    border: "1px",
    borderStyle: "solid",
    marginBottom: 50,
    MaxHeight: 300,
    MaxWidth: 400,
    height: 250,
    width: 380,
    padding: 10,
    flexDirection: "column",
    borderRadius: "5%",
    justifyContent: "center",
    alignItems: "center",
    background: "#ffffff",
  },
  img: {
    display: "block",
    maxHeight: 300,
    maxWidth: 400,
    width: "auto",
    height: 300,
    borderRadius: "5%",
  },
  previewText: {
    color: "#bcbcbc",
  },
  previewSubText: {
    color: "#8e7cc3",
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 8,
  borderColor: "#000000",
  color: "#000000",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  width: 380,
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumb = {
  display: "inline-flex",
  border: "0",
  marginBottom: 8,
  MaxHeight: 300,
  MaxWidth: 400,
  height: "auto",
  width: "auto",
  padding: 3,
  boxSizing: "content-box",
};

function DropZone(props) {
  const [files, setFiles] = useState([]);

  const classes = useStyles();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    //acceptedFiles,
  } = useDropzone({
    accept: "image/jpg, image/jpeg, image/png, image/jfif",
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (props.type === 1) {
        props.setToggleBasePreview(true);
      } else if (props.type === 2) {
        props.setToggleStylePreview(true);
      }
      props.setTogglePreview(true);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            styleImg: props.isStyleImg,
          })
        )
      );
      acceptedFiles.map((file) => props.setImage(file));
    },
  });

  // set a boolean to invoke file preview
  const thumbs = files.map((file) => (
    <Grid alignItems="center">
      <div style={thumb} key={file.name}>
        <img src={file.preview} className={classes.img} alt="woops" />
      </div>
    </Grid>
  ));

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Box>
      <Box>
        <Typography className={classes.dropZoneTitle}>{props.title}</Typography>
      </Box>

      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />

        {files.length && props.show ? (
          thumbs
        ) : (
          <Box className={classes.placeholderBoxBase} textAlign="center">
            <Typography className={classes.previewSubText}>
              {props.previewText2}
            </Typography>
            <br />
            <Typography className={classes.previewText}>
              {props.previewText3}
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default DropZone;

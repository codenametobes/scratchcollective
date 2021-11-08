import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  plusSign: {
    fontSize: "4.5rem",
  },
  dropZoneTitle: {
    fontSize: "2rem",
    margin: "0 auto",
    paddingTop: "2rem",
  },
  hoverMessage: {
    fontSize: "1.5vh",
    color: "#000000",
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderRadius: 2,
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
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

function ProfileDrop(props) {
  const [files, setFiles] = useState([]);
  const [toggleOnHover, setToggleOnHover] = useState(false);

  const classes = useStyles();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            key: Date.now(),
          })
        )
      );
      acceptedFiles.map((file) => props.setImage(file));
    },
  });

  const thumbs = files.map((file) => (
    <Box
      position="absolute"
      display="flex"
      alignItems="center"
      onMouseOver={() => setToggleOnHover(true)}
      onMouseLeave={() => setToggleOnHover(false)}
    >
      {" "}
      <img
        src={file.preview}
        style={{
          borderRadius: "50%",
          width: "26vh",
          height: "26vh",
          display: "block",
          filter: toggleOnHover ? "blur(1.5px)" : "none",
        }}
        alt="woops"
      />
    </Box>
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
    <Box
      display="flex"
      onMouseOver={() => setToggleOnHover(true)}
      onMouseLeave={() => setToggleOnHover(false)}
    >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          thumbs
        ) : (
          <Box
            position="absolute"
            display="flex"
            alignItems="center"
            border="none"
            background="#ffffff"
          >
            <img
              src={props.profilePicUrl}
              alt={props.profilePicUrl}
              style={{
                borderRadius: "50%",
                width: "26vh",
                height: "26vh",
                background: "#bcbcbc",
                display: "block",
                filter: toggleOnHover ? "blur(1.5px)" : "none",
              }}
            />
          </Box>
        )}
        {toggleOnHover && (
          <Box sx={{ mt: 6 }} position="relative">
            <Typography className={classes.hoverMessage}>
              Click or drag file
              <br />
              to add/update profile pic
            </Typography>
          </Box>
        )}
      </div>
    </Box>
  );
}

export default ProfileDrop;

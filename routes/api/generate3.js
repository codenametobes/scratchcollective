const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// @route   GET api/generate3
// @desc    Style input images and return to frontend
// @access  Private
router.get("/", (req, res) => {
  console.log("generate 3 checkcomplete starting");

  try {
    const oldDirectory = "images/inputImages";
    const newDirectory = "images/inputImagesTemp";

    // clear inputimages temp
    const tempDirectory = "images/inputImagesTemp";
    console.log("generate3 - delete existing tempimages");
    fs.readdir(tempDirectory, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file != ".gitkeep") {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      }
    });

    // move old images to tempdirectory
    fs.readdir(oldDirectory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        console.log(`generate3 tempdir: ${file}`);
        if (file != ".gitkeep") {
          fs.rename(
            path.join(oldDirectory, file),
            path.join(newDirectory, file),
            function (err) {
              if (err) throw err;
            }
          );
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

  try {
    fs.readFile("images/styledImage/stylized.jpg", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

// const checkComplete = async (req, res) => {};

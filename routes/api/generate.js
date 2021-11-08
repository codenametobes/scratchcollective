const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// multer instantiation
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/inputImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: fileStorageEngine,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jfif"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jfif and .jpeg format allowed!"));
    }
  },
});

// main function for GET api/generate
const stylize = async (req, res) => {
  console.log("1 - stylize started");
  try {
    const directory = "images/styledImage";
    console.log("2 - delete existing styled");
    // delete existing styled
    fs.readdir(directory, (err, files) => {
      if (err) throw err;
      console.log("3 - fs.readdir");
      for (const file of files) {
        console.log(`*delete styledImage: ${file}`);
        if (file != ".gitkeep") {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }

  file1 = req.files[0].filename;
  file2 = req.files[1].filename;
  if (file1.split("_")[0] < file2.split("_")[0]) {
    console.log("4-changing names for python script");
    //change file names for python script
    file1Ext = file1.split(".")[1];
    file2Ext = file2.split(".")[1];
    fs.renameSync(
      req.files[0].path,
      `./images/inputImages/original_image.${file1Ext}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    fs.renameSync(
      req.files[1].path,
      `images/inputImages/style_image.${file2Ext}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } else {
    fs.renameSync(
      req.files[1].path,
      `./images/inputImages/original_image.${file2Ext}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    fs.renameSync(
      req.files[0].path,
      `images/inputImages/style_image.${file1Ext}`,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  res.status(200).send("images stored");
};

// @route   POST api/generate
// @desc    Style input images and return to frontend
// @access  Private
router.post("/", upload.array("image"), stylize);

module.exports = router;

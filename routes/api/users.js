const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");

const User = require("../../models/User");

const { jwtSecret, imgurClientId } = require("../../constants");

// multer instantiation
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/profileImages");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// @route   POST api/users
// @desc    REGISTER new user
// @access  Public (don't need token)
router.post("/", async (req, res) => {
  const { publicAddress } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ publicAddress: publicAddress });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists " }],
      });
    }

    user = new User({
      publicAddress: publicAddress,
    });

    await user.save();

    // Return jsonwebtoken
    // mongoose library uses an abstraction that replaces _id with .id
    const payload = {
      user: {
        publicAddress: publicAddress,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token: token, user: user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users/edit
// @desc    MODIFY/EDIT existing user
// @access  Private (need token)
router.post("/edit", auth, upload.array("image"), async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  const getImgurURL = async (localPath) => {
    const data = new FormData();

    data.append("image", fs.createReadStream(process.cwd() + localPath));

    const imgurConfig = {
      method: "post",
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID ${imgurClientId}`,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(imgurConfig);

    return response.data;
  };

  const profileFields = {};
  if (req.body.name) profileFields.name = req.body.name;
  if (req.body.email) profileFields.email = req.body.email;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.twitter) profileFields.twitter = req.body.twitter;
  if (req.body.instagram) profileFields.instagram = req.body.instagram;
  if (req.body.facebook) profileFields.facebook = req.body.facebook;
  if (req.files[0]) {
    const filePath = `images/profileImages/${req.files[0].filename}`;
    const imgurBody = await getImgurURL(`/${filePath}`);
    const imgurUrl = imgurBody.data.link;
    profileFields.profilePicUrl = imgurUrl;
  }

  try {
    let user = await User.findOneAndUpdate(
      { publicAddress: req.user.publicAddress },
      { $set: profileFields },
      { new: true }
    );

    const directory = "images/profileImages";
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        if (file != ".gitkeep") {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      }
    });

    res.json({ user: user });
  } catch (err) {
    res.status(401).json({ msg: "Could not modify" });
  }
});

// @route   Get api/users/nonce
// @desc    Fetch nonce of current user
// @access  Public (no token)
router.get("/nonce/:publicAddress", async (req, res) => {
  try {
    let user = await User.findOne({ publicAddress: req.params.publicAddress });
    res.json({ nonce: user.nonce });
  } catch (err) {
    res.status(401).json({ msg: "Could not fetch nonce" });
  }
});

// @route   Get api/users/view/:publicAddress
// @desc    Get single user
// @access  Public (no token)
router.get("/view/:publicAddress", async (req, res) => {
  try {
    let user = await User.findOne({ publicAddress: req.params.publicAddress });
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Could not find User" });
  }
});

// @route   Get api/users/all
// @desc    Get all users
// @access  Public (no token)
router.get("/all", async (req, res) => {
  try {
    let users = await User.find({}).select("-nonce");

    res.json(users);
  } catch (err) {
    res.status(401).json({ msg: "Could not fetch all users" });
  }
});

module.exports = router;

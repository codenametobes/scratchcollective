const express = require("express");
const router = express.Router();
const Art = require("../../models/Art");

// @route   GET api/view/nft/:id
// @desc    Get art by ID
router.get("/nft/:id", async (req, res) => {
  try {
    const art = await Art.findOne({ scratchCollectiveId: `${req.params.id}` });

    if (!art) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(art);
  } catch (err) {
    console.error(err.message);
  }
});

// @route   GET api/view/collection
// @desc    Get all art
// @access  Public
router.get("/collection", async (req, res) => {
  try {
    const collection = await Art.find({});

    if (!collection) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(collection);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   GET api/view/collection/:publicAddress
// @desc    Get collection by user
// @access  Public
router.get("/collection/:publicAddress", async (req, res) => {
  try {
    const collection = await Art.find({
      originalCreator: `${req.params.publicAddress}`,
    });
    if (!collection) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(collection);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;

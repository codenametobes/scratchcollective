const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const ethSigUtil = require("eth-sig-util");
const User = require("../../models/User");

const { jwtSecret } = require("../../constants");

const checkSignature = (msg, signature) => {
  const msgParams = {
    data: msg,
    sig: signature,
  };
  return ethSigUtil.recoverPersonalSignature(msgParams);
};

// @route   GET api/authenticate
// @desc    Check for authentication and returns user object as response
// @access  Private (need token)
router.get("/", auth, async (req, res) => {
  try {
    // req.user is already decoded in auth middleware, can use per below
    const user = await User.findOne({ publicAddress: req.user.publicAddress });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/authenticate
// @desc    Authenticate user & get token (then make requests to private routes)
// @access  Public
router.post("/", async (req, res) => {
  const { signature, publicAddress } = req.body;

  if (!signature || !publicAddress)
    return res
      .status(400)
      .send({ error: "Request should have signature and publicAddress" });

  try {
    // See if user exists in db
    let user = await User.findOne({ publicAddress: publicAddress });

    if (!user) {
      try {
        user = new User({
          publicAddress: publicAddress,
          profilePicUrl:
            "https://ostermancron.com/wp-content/uploads/2016/02/blank-profile-picture-973460_640.png",
        });
        await user.save();
        // Return jsonwebtoken
        // mongoose library uses an abstraction that replaces _id with .id
        const payload = {
          user: {
            publicAddress: publicAddress,
          },
        };

        console.log("registering new user");

        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          res.json({ token: token, user: user, isNewUser: true });
        });
      } catch (err) {
        console.log(`newUser didn't work: ${err}`);
      }
    } else {
      const msg = `ScratchCollective Login (Click Sign to login): ${user.nonce}`;

      // should now have msg, publicAddress, signature; returns the public adddress to match
      const addressToMatch = checkSignature(msg, signature);

      // eth-sig-util autmoatically lowerCases address, need to match req.body
      const beforeLower = req.body.publicAddress;
      const afterLower = beforeLower.toLowerCase();

      if (addressToMatch == afterLower) {
        // sets new nonce in mongodb
        try {
          const newNonce = await User.findOneAndUpdate(
            { publicAddress: req.body.publicAddress },
            { $set: { nonce: Math.floor(Math.random() * 10000) } }
          );
        } catch (err) {
          console.log("error setting nonce");
          console.log(err);
        }

        const payload = {
          user: {
            id: user.id,
            publicAddress,
          },
        };

        // returns JWT based on verification of ecrecover
        jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
          if (err) throw err;
          console.log(`#5 jwt token :${token}`);
          res.json({ token: token, user: user, isNewUser: false });
        });
      } else {
        console.log("Address not verified");
        res.status(401).send("Could not authorize");
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

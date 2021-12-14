const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

// @route   GET api/generate2
// @desc    Style input images and return to frontend
// @access  Private
router.get("/", (req, res) => {
  // spawns child process to call stylize python script
  console.log("runPython running....");

  const child = spawn(process.env.PYTHON_EXEC, [
    "styletransfer/styletransfer.py",
  ]);

  res.status(200).send("child process exit");

module.exports = router;


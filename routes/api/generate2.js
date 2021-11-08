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

  // child.stderr.on("error", function (err) {
  //   console.log("generate2 - child proccess error");
  //   console.log(err.toString());
  // });

  // child.stdout.on("data", (data) => {
  //   console.log(`generate2 - data:${data}`);
  // });

  // child.on("exit", (code) => {
  //   console.log("generate2 child exit");
  //   res.status(200).send("child process exit");
  // });
});

module.exports = router;

// const runPython = (req, res) => {
//   // spawns child process to call stylize python script
//   console.log("runPython running....");

//   const child = spawn(proces.env.PYTHON_EXEC, [
//     "styletransfer/styletransfer.py",
//   ]);

//   child.stderr.on("error", function (err) {
//     console.log("generate2 - child proccess error");
//     console.log(err.toString());
//   });

//   child.stdout.on("data", (data) => {
//     console.log(`generate2 - data:${data}`);
//   });

//   child.on("exit", (code) => {
//     console.log("generate2 child exit");
//     res.status(200).send("child process exit");
//   });
// };

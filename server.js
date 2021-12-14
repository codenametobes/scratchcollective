const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Connect Database
connectDB();

// deploy react build folder
app.use(express.static(path.join(__dirname, "client", "build")));

// Define Routes
app.use("/api/generate", require("./routes/api/generate"));
app.use("/api/generate2", require("./routes/api/generate2"));
app.use("/api/generate3", require("./routes/api/generate3"));
app.use("/api/mint", require("./routes/api/mint"));
app.use("/api/mintsingle", require("./routes/api/mintsingle"));
app.use("/api/view", require("./routes/api/view"));
app.use("/api/authenticate", require("./routes/api/authenticate"));
app.use("/api/users", require("./routes/api/users"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Node app is running on port ${PORT}`);
});

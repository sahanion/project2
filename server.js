const express = require("express");
const cors = require("cors");
require("dotenv").config();

const path = require("path");

const quizRoutes = require("./routes/quiz");

const app = express();

app.use(cors());
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api", quizRoutes);

// send homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
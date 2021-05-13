const express = require('express');
const videos = require("./videos");

const router = express.Router();

router.get("/videos", function(req, res) {
  res.json(videos);
});

module.exports = router;

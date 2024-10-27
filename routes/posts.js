const express = require("express");
const router = express.Router();

//import data
const posts = require('../data/posts');

//posts routes
router.get("/", (req, res) => {
    res.json(posts);
});

//export posts router
module.exports = router;
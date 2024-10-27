const express = require("express");
const router = express.Router();

//import data
const comments = require('../data/comments');

//comments routes
router.get("/", (req, res) => {
    res.json(comments);
});

//export comments router
module.exports = router;
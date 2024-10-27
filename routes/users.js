const express = require("express");
const router = express.Router();

//import data
const users = require('../data/users');

//user routes
router.get("/", (req, res) => {
    res.json(users);
});

//export user router
module.exports = router;
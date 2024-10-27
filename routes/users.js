const express = require("express");
const router = express.Router();

//import data
const users = require('../data/users');




router.get("/", (req, res) => {
    res.json(users);
});



module.exports = router;
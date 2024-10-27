const express = require("express");
const router = express.Router();

//import data
const comments = require('../data/comments');

//comments routes
router.get("/", (req, res) => {
    res.json(comments);
});

//get comments by id
router.get("/:id", (req, res) => {
    const comment = comments.find(c => c.id == req.params.id)
    if (comment) res.json(comment)
    else res.status(404).send("User not found");
})




//export comments router
module.exports = router;
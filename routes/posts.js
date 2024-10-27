const express = require("express");
const router = express.Router();

//import data
const posts = require('../data/posts');

//posts routes
router.get("/", (req, res) => {
    res.json(posts);
});

//get posts by id
router.get("/:id", (req, res) => {
    const post = users.find(p => p.id == req.params.id)
    if (post) res.json(post)
    else res.status(404).send("User not found");
})






//export posts router
module.exports = router;
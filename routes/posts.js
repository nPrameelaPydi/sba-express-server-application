const express = require("express");
const router = express.Router();

//import data
const posts = require('../data/posts');

//posts routes
router.get("/", (req, res) => {
    res.json(posts);
});

//GET posts by id
router.get("/:id", (req, res) => {
    const post = posts.find(p => p.id == req.params.id)
    if (post) res.json(post)
    else res.status(404).send("User not found");
})

//POST create new post
//POST create new user
router.post("/", (req, res) => {
    try {
        const { userId, title, content } = req.body;
        if (!userId || !title || !content) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["userId", "title", "content"]
            });
        }
        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(u => u.id)) + 1 : 1,
            title: title.trim(),
            content: content.trim()
        };
        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ error: "Error creating post" });
    }
});






//export posts router
module.exports = router;
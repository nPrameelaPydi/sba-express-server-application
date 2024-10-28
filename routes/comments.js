const express = require("express");
const router = express.Router();

//import data
const comments = require('../data/comments');

//comments routes
router.get("/", (req, res) => {
    res.json(comments);
});

//GET comments by id
router.get("/:id", (req, res) => {
    const comment = comments.find(c => c.id == req.params.id)
    if (comment) res.json(comment)
    else res.status(404).send("User not found");
})

//POST create new comment
//POST create new post
//POST create new user
router.post("/", (req, res) => {
    try {
        const { postId, userId, content } = req.body;
        if (!postId || !userId || !content) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["userId", "title", "content"]
            });
        }
        const newComment = {
            id: comments.length > 0 ? Math.max(...comments.map(u => u.id)) + 1 : 1,
            postId: postId,
            userId: userId,
            content: content.trim()
        };
        comments.push(newComment);
        res.status(201).json(newComment);
    } catch (error) {
        console.error("Comment creation error:", error);
        res.status(500).json({ error: "Error creating comment" });
    }
});




//export comments router
module.exports = router;
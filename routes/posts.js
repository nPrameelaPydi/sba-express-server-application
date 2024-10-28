const express = require("express");
const router = express.Router();

//import data
const posts = require('../data/posts');


// GET all posts with filtering
router.get("/", (req, res) => {
    try {
        let filteredPosts = [...posts];
        // Filter by userId
        if (req.query.userId) {
            filteredPosts = filteredPosts.filter(
                post => String(post.userId) === String(req.query.userId)
            );
        }
        // Send the filtered posts as the response
        res.status(200).json(filteredPosts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});








// GET post by id
router.get("/:id", (req, res) => {
    try {
        const post = posts.find(p => p.id === parseInt(req.params.id));
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error fetching post" });
    }
});

//POST create new post
router.post("/", (req, res) => {
    try {
        const { userId, title, content } = req.body;
        if (!userId || !title || !content) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["userId", "title", "content"]
            });
        }

        // Generate a random number of likes between 0 and 100
        const randomLikes = Math.floor(Math.random() * 101);


        const newPost = {
            id: posts.length > 0 ? Math.max(...posts.map(u => u.id)) + 1 : 1,
            title: title.trim(),
            content: content.trim(),
            likes: randomLikes,
            createdAt: new Date().toLocaleDateString()
        };
        posts.push(newPost);
        res.status(201).json(newPost);


    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ error: "Error creating post" });
    }
});

// PUT update post
router.put("/:id", (req, res) => {
    try {
        const { title, content } = req.body;
        const postId = parseInt(req.params.id);

        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found" });
        }
        // Update only provided fields
        if (title) posts[postIndex].title = title.trim();
        if (content) posts[postIndex].content = content.trim();
        res.json(posts[postIndex]);
    } catch (error) {
        res.status(500).json({ error: "Error updating post" });
    }
});

// DELETE post
router.delete("/:id", (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const postIndex = posts.findIndex(p => p.id === postId);

        if (postIndex === -1) {
            return res.status(404).json({ error: "Post not found" });
        }
        //deleting one element
        const deletedPost = posts.splice(postIndex, 1);
        res.json({ message: "Post deleted successfully", post: deletedPost[0] });
    } catch (error) {
        res.status(500).json({ error: "Error deleting post" });
    }
});


//export posts router
module.exports = router;
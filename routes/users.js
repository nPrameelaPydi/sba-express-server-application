const express = require("express");
const router = express.Router();

//import data
const users = require('../data/users');
//console.log(users);
const posts = require('../data/posts');
const comments = require('../data/comments');

// GET all users
router.get("/", (req, res) => {
    try {
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// GET user by id
router.get("/:id", (req, res) => {
    try {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
});

//POST create new user
router.post("/", (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                error: "Missing required fields",
                required: ["name", "email"]
            });
        }
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name: name.trim(),
            email: email.toLowerCase().trim()
        };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({ error: "Error creating user" });
    }
});

// PUT update user
router.put("/:id", (req, res) => {
    try {
        //Request Data Extraction
        //Destructures name and email from request body
        const { name, email } = req.body;
        const paramid = parseInt(req.params.id);
        //Finding User
        const userIndex = users.findIndex(u => u.id === paramid);
        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        // Update only provided fields        
        if (name) users[userIndex].name = name.trim();
        if (email) users[userIndex].email = email.toLowerCase().trim();
        res.json(users[userIndex]);
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});

// DELETE user
router.delete("/:id", (req, res) => {
    try {
        const paramid = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === paramid);

        if (userIndex === -1) {
            return res.status(404).json({ error: "User not found" });
        }
        //deleting one element
        const deletedUser = users.splice(userIndex, 1);
        res.json({ message: "User deleted successfully", user: deletedUser[0] });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});


//GET /users/:id/comments
//Retrieves comments made by the user with the specified id.
router.get("/:id/comments", (req, res) => {
    const { id } = req.params; // Extract post id from route parameter

    const filteredComments = comments.filter(comment => comment.userId == id);
    if (filteredComments.length === 0) {
        return res.json({ message: "No comments found for this post" });
    }
    res.json({ comments: filteredComments });
});


//export user router
module.exports = router;
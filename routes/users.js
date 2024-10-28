const express = require("express");
const router = express.Router();

//import data
const users = require('../data/users');
//console.log(users);

//user routes
//base route
router.get("/", (req, res) => {
    res.json(users);
});

//GET get user by id
router.get("/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    if (user) res.json(user)
    else res.status(404).send("User not found");
})

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



//export user router
module.exports = router;
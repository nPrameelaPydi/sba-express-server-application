const express = require("express");
const router = express.Router();

//import data
const users = require('../data/users');

//user routes
//base route
router.get("/", (req, res) => {
    res.json(users);
});

//get user by id
router.get("/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    if (user) res.json(user)
    else res.status(404).send("User not found");
})

//In JavaScript, when you use the spread operator (...req.body), any properties in req.body with the same name as existing properties in the object will override those original values.









//export user router
module.exports = router;
const express = require("express");
const app = express();
const PORT = 4000;

//import routes
const users = require('./routes/users.js');
const posts = require('./routes/posts.js');
const comments = require('./routes/comments.js');
//router setup
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

app.get("/", (req, res) => {
    res.send("Work in progress!")
})

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

//Request Timing Middleware
//Logs how long each request takes to process.
const requestTimer = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} took ${duration}ms`);
    });
    next();
};
app.use(requestTimer);

//Middleware to log request details
const requestLogger = (req, res, next) => {
    const localTime = new Date().toLocaleString(); // Get server local time and date
    console.log(`[${localTime}] ${req.method} request to ${req.url}`);
    next();
};
app.use(requestLogger);













//base route
app.get("/", (req, res) => {
    res.send("Welcome to the SBA App!");
})

//error-handling middleware
app.use((err, req, res, next) => {
    res.status(500).send(err);
})

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})

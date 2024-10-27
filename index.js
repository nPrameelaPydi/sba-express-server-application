const express = require("express");
const app = express();
const PORT = 4000;

// Import routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

// Middleware (MUST come before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Timer Middleware
const requestTimer = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.url} took ${duration}ms`);
    });
    next();
};

// Request Logger Middleware
const requestLogger = (req, res, next) => {
    const localTime = new Date().toLocaleString();
    console.log(`[${localTime}] ${req.method} request to ${req.url}`);
    next();
};

app.use(requestTimer);
app.use(requestLogger);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

// Base route
app.get("/", (req, res) => {
    res.send("Welcome to the SBA App!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
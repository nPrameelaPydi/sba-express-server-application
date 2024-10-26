const express = require("express");
const app = express();
const PORT = 4000;

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

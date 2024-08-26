// controllers/url.js

// Import necessary modules
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

// User authentication functions
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    return res.redirect("/");
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", { error: "Invalid Username or Password" });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

// New functions for short URL generation and analytics
async function handleGenerateNewShortURL(req, res) {
    // Logic to generate a new short URL
    const { originalUrl } = req.body;
    const shortId = uuidv4(); // Example, you might use a different logic
    // Save shortId and originalUrl to database
    res.json({ shortId, originalUrl });
}

async function handleGetAnalytics(req, res) {
    const { shortId } = req.params;
    // Logic to get analytics data for the given shortId
    res.json({ shortId, analyticsData: "Example analytics data" });
}

// Export all functions
module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleGenerateNewShortURL,
    handleGetAnalytics,
};

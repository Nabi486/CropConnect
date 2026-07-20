// src/routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { register, login, getMe, logout, googleCallback } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const { registerRules, loginRules, validate } = require("../middleware/validate");

// Public routes (with rate limiting + validation)
router.post("/register", authLimiter, registerRules, validate, register);
router.post("/login", authLimiter, loginRules, validate, login);
router.post("/logout", logout);

// Protected routes
router.get("/me", protect, getMe);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallback
);

module.exports = router;

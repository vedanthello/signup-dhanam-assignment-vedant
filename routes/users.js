const router = require("express").Router();
const { signupUser, sendWelcomeEmail } = require("../utils/Auth.js");
const { validateSignup } = require("../utils/Validation.js");

// User sign up route
router.post("/signup-user", validateSignup, signupUser, sendWelcomeEmail);

module.exports = router;
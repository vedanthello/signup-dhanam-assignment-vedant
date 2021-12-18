const router = require("express").Router();
const { signupUser } = require("../utils/Auth.js");
const { validateSignup } = require("../utils/Validation.js");

// User sign up route
router.post("/signup-user", validateSignup, async (req, res) => {
  await signupUser(req.body, res);
});

module.exports = router;
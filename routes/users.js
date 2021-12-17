const router = require("express").Router();
const { signupUser } = require("../utils/Auth.js");

// User sign up route
router.post("/signup-user", async (req, res) => {
  await signupUser(req.body, res);
});

module.exports = router;
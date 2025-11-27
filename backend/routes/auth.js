const User = require("../models/UserModel");

const { registerUser, loginUser } = require('../controllers/auth');
const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const exists = await User.findOne({ email });
  res.json({ exists: !!exists });
});

module.exports = router;

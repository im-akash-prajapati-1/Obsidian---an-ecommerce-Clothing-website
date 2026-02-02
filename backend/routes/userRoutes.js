const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware")
const router = express.Router();

//@routes is a POST Request - /api/users/register
// @description -  Register a new user
// @access to this request is Public

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registration Logic
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User Already Exist" });

    user = new User({ name, email, password });
    await user.save();

    //JWT token payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign up and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// @Route POST /api/users/login
// @description Authenticate user
// @Access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials: No User found" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" });

    const payload = { user: { id: user._id, role: user.role } };

    // Sign in and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) throw err;

        // send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @Route GET /api/user/profile
// @description GET logged-in user profile (Protected Route)
// @Access Private
router.get("/profile", protect, async (req, res) => {
    res.json(req.user);
})

module.exports = router;

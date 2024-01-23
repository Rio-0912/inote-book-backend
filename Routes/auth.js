const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Rio";
const fetchuser = require('../Middleware/fetchUser')
// Create a user using post  "/api/auth/"

router.post(
  // Route 1
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Must of atleast 5 charater").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let  success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      // user with same eamil wixits
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        success = false
        return res.status(400).json({success, error: "user with same email exits" });
      }
      const salt = await bcrypt.genSalt(10);
      let secPass = await bcrypt.hash(req.body.password, salt);
      // creating user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      // sendign response
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      success = false
      res.status(500).send("some error occured");
    }
  }
);



// Authenticate a a user NO login req
router.post(
  // Route 2
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Cannot be blank").exists(),
  ],
  async (req, res) => {
    let  success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Incorrect Credentisla  " });
      }
      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "Incorrect Credentisla  " });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success = true
      res.json({success, authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// Route 3
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    // fetch user se user id mile
    let
    userId = req.user.id;

    const user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
})

module.exports = router;

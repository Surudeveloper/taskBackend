const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const isExistUser = await Users.findOne({ email }).lean();
  if(isExistUser){
    res.json({ error: 'Email Already Exist' });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword, role });
    await user.save();
    res.json({ message: 'User registered successfully!' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret');
  res.json({ token, role:user.role });
});

router.get('/', authenticateJWT, async (req,res)=>{
  const user = await Users.find({});
  return res.status(200).json({ data: user });
})

module.exports = router;

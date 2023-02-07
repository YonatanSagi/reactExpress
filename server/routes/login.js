const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const userModel = require('../models/userModel');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const router = express.Router();
require('../configs/passport.config')
router.use(bodyParser.json())

router.post('/signin', passport.authenticate('local'), (req, res, next) => { 
  if(!req.user) return
  const data = {}
  data.id = req.user.id
  data.email = req.user.email
  data.username = req.user.username
  res.send(data)
})





router.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../dist/index.html'))
})
module.exports = router
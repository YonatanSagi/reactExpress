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

router.post('/signin', passport.authenticate('local', { successRedirect: '/login/good', failureRedirect: '/login/bad' }), (req, res, next) => { })


router.get('/bad', async (req, res) => {
  req.session.loginCount ? req.session.loginCount++ : req.session.loginCount = 1
  req.session.save()

  console.log('heyyyy');
  res.send()
})

router.get('/good', (req, res) => {
  req.session.loginCount ? req.session.loginCount++ : req.session.loginCount = 1
  req.session.save()
  console.log('good');
  res.send()
})



router.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../dist/index.html'))
})
module.exports = router
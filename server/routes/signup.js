const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path')
const userModel = require('../models/userModel');
const genPassword = require('../utils/passwordUtil').genPassword
const router = express.Router();
router.use(bodyParser.json())

router.post('/', async (req, res) => {
  try {
    credentials = req.body
    const data = await userModel.find({ email: credentials.email })
    if (JSON.stringify(data) != '[]') {
      res.send('sameEmail')
      return
    }
    const saltHash = genPassword(credentials.password)
    const salt = saltHash.salt
    const hash = saltHash.hash
    delete credentials.password
    credentials.hash = hash
    credentials.salt = salt
    const newUser = await new userModel(credentials)
    await newUser.save();
    console.log('new user created');
    res.sendStatus(200)
  }
  catch {
    res.sendStatus(500)
  }

})
router.use('/', (req, res) => res.sendFile(path.resolve(__dirname + '/../../dist/index.html')))
module.exports = router
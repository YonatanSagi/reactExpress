const express = require('express')
const path = require('path')
const router = express.Router();

router.post('/logout', (req, res) => {
    req.logOut((err)=>{err ? res.sendStatus(500) : res.send(true) })
    
})

router.use('/', (req, res) => res.sendFile(path.resolve(__dirname + '/../../dist/index.html')))
module.exports = router
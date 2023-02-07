const express = require('express');
const router = express.Router()

router.post('/', (req, res) => {
    req.logOut((err)=>{err ? res.sendStatus(500) : res.send(true) })
    
})

module.exports = router
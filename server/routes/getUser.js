const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    if (req.user) {
        const data = {}
        data.id = req.user.id
        data.email = req.user.email
        data.username = req.user.username
        res.send(data)
    }
    else {
        res.send()
    }


})

module.exports = router
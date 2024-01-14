const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    obj = {
        a: ' alsdf',
        number: 123
    }
    res.json(obj)
})

module.exports = router
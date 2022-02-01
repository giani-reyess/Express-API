const express = require('express')
const faker = require('faker')
const router = express.Router()

router.get("/", (req,res) => {
  res.send('This is the settings route')
})

module.exports = router

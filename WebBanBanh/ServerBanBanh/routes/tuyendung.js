const express = require('express')
const router = express.Router()
const TuyenDungController = require('../controllers/TuyenDungController')

router.get('/', TuyenDungController.index)
module.exports = router;
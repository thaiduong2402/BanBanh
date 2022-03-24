const express = require('express')
const router = express.Router()
const GioHangController = require('../controllers/GioHangController')

router.get('/', GioHangController.getGioHang)
module.exports = router;
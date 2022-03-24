const express = require('express')
const router = express.Router()
const BanhController = require('../controllers/BanhController')

router.post('/', BanhController.index)
router.get('/detail', BanhController.getItem)
module.exports = router;
const express = require('express')
const router = express.Router()
const BuyController = require('../controllers/BuyController')

router.post('/', BuyController.index)
router.get('/success', BuyController.success)
router.get('/cancel', BuyController.cancel)
module.exports = router;
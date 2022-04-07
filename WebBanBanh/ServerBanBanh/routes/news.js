const express = require('express')
const router = express.Router()
const NewsController = require('../controllers/NewsController')

router.get('/', NewsController.index)
router.get('/tin', NewsController.getTin)
router.post('/', NewsController.postNews)
module.exports = router;
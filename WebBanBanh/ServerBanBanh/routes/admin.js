const express = require('express')
const multer = require('multer');

const router = express.Router()
const AdminController = require('../controllers/AdminController')


const storage = multer.memoryStorage({
    destination:function(req, file,callback) {
        callback(null,'')
    }
})

const upload = multer({storage}).single('image')

router.get('/login', AdminController.getLogin)

router.post('/login', AdminController.postLogin)
router.post('/register',AdminController.checkAdmin, AdminController.postRegister)
router.get('/task', AdminController.checkLogin,AdminController.task)
router.post('/additem' , upload,AdminController.checkLogin, AdminController.addItem)
router.post('/getAll' , AdminController.checkLogin,AdminController.getAll)
router.post('/deleteitem' , AdminController.deleteItem)
router.post('/edititem' , AdminController.editItem)
router.post('/donhang' , AdminController.checkLogin,AdminController.donHang)
router.post('/addtuyendung' ,AdminController.checkLogin, AdminController.addTuyenDung)
module.exports = router;
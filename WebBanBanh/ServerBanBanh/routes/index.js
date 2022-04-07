
const banhRouter = require('./banh');
const buyRouter = require('./buy');
const gioHangRouter = require('./gioHang');
const newsRouter = require('./news');
const tuyendungRouter = require('./TuyenDung')
const adminRouter = require('./admin')


function route(app){


app.use('/banh', banhRouter)
app.use('/giohang', gioHangRouter)
app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})
app.use('/buy', buyRouter)
app.use('/news', newsRouter)
app.use('/tuyendung', tuyendungRouter)
app.use('/admin', adminRouter)

}

module.exports = route
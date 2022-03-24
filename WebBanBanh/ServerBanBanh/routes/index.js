
const banhRouter = require('./banh');
const gioHangRouter = require('./gioHang');
function route(app){


app.use('/banh', banhRouter)
app.use('/giohang', gioHangRouter)
app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

}

module.exports = route
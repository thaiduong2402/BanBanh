const mongoose = require('mongoose')
 
async function connect(){
    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/BanBanh',{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        console.log('ket noi du lieu thanh cong')
    } catch (error) {
        console.log('ket noi du lieu that bai')
    }
}

module.exports = {connect}
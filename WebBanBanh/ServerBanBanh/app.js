const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const cors = require('cors')
const handlebars = require('express-handlebars')
const { title } = require('process')
const bodyParser = require('body-parser')
const { username } = require('casual')
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const route = require('./routes')
const db = require('./config/db')
app.use(cookieParser())
app.set('views', path.join(__dirname,'views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

app.use(cors())


app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Headers","*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
})

app.use(morgan('combined'))
app.use(express.static('public'))
app.use(expressLayouts);
app.set('view engine','ejs')
app.set('layout','./layouts/layout')
const port = process.env.PORT || 3000;
db.connect()

route(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
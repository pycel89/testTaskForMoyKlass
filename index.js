require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routers/index')

const PORT = process.env.PORT||5000;
//const 
const app = express()
app.use(cors())
app.use(express.json())
app.use('/',router)


const start = async () => {
    try {
        app.listen(PORT, () => console.log("порт для запуска " + PORT))

    }
    catch (e) {
        console.log(e);
    }
}


start()


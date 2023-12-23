const Pool = require('pg').Pool

const pool = new Pool(
    {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    }
)
module.exports = pool
/*const {Sequelize} = require('sequelize')
//require('dotenv').config()

module.exports = new Sequelize(
    process.env.DB_NAME,
    //'Bot',
    //'postgres',
    //'toor',
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'postgres',
        //host:'localhost',
        //port:5432
        host: process.env.DB_HOST,
        port:process.env.DB_PORT
    }    
)*/
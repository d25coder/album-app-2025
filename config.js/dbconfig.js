//1. build a connection to the database
const mysql = require('mysql2')

//1a. create a pool - create multiple connection to the same database or multiple quieries 
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    use: 'root',
    password: '',
    database: 'myalbumdb'
})

module.exports = pool
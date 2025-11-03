// Build Server
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000


// Handle Security
//staic files
//helmet will block bootstrap
const helmet = require('helmet')
const cors = require('cors')

// configuring helmet
//server.use(helmet())

// configuration
server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"] 
    }
}))


//configuration
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))







server.listen(PORT, ()=> console.log(`The Dodgers won the 2025 World Series!!`))
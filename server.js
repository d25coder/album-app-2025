// Build Server
// 1
const express = require('express')
// 2
const server = express()
// 3
const PORT = process.env.PORT || 3000


// Handle Security
//staic files
//helmet will block bootstrap
// 5
const helmet = require('helmet')
const cors = require('cors')

// configuring helmet
//server.use(helmet())

// configuration
//7
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
// 6
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))






// 4
server.listen(PORT, ()=> console.log(`The Dodgers won the 2025 World Series!!`))
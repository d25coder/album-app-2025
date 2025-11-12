// Build Server
// 1-1
const express = require('express')
// 2-1
const server = express()
//8-1 import from root directory to go to routes then router
const router = require('./routes/router')
// 3-1
const PORT = process.env.PORT || 3000


// Handle Security
//staic files
//helmet will block bootstrap
// 5-1
const helmet = require('helmet')
const cors = require('cors')

// configuring helmet
//server.use(helmet())

// configuration
//7-1
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
// 6-1
//line 39-40 takes a request, parse req, format as object, and turns to json
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: true}))

// 9-1 localhost:3000
server.use('/', router)



// 4-1
server.listen(PORT, ()=> console.log(`The Dodgers won the 2025 World Series!!`))


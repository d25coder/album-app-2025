// 2-1
const express = require('express')
//2 - 2
const router = express.Router()
//4-2 create a root route
const PORT = process.env.PORT || 3000


// 5-2 root route localhost
router.get('/api', (req, res)=> {
    //res.send('album api') //check to see if its working
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album` 
    })
})

//6-7 
router.use('/api/album', require('./api/albumRoutes'))

// 6-2 error page
router.use((req, res, next)=> {
    res.status(404)
    .setDefaultEncoding('<h1> Error This page does not exist</h1>')
})

// 3-2
module.exports = router
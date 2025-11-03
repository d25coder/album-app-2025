// 1
const express = require('express')
//2 
const router = express.Router()
//3 creating a root route
const PORT = process.env.PORT || 3000


// 4 root Route localhost
router.get('/api', (req, res)=> {
    //res.send('album api') //check to see if its working
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album` 
    })
})



// 5 error page
router.use((req, res, next)=> {
    res.status(404)
    .setDefaultEncoding('<h1> Error This page does not exist</h1>')
})

// 3
module.exports = router
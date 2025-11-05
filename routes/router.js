// 2-1
const express = require('express')
//2 - 2
const router = express.Router()
//4-2 create a root route
const PORT = process.env.PORT || 3000


// 5-2 root route http://localhost:300/api
router.get('/api', (req, res)=> {
    //res.send('album api') //check to see if its working
    res.json({
        'All Albums': `http://localhost:${PORT}/api/album`,  //when someone click on api/album, use module albumRoute
        'All Artist': `http://localhost:${PORT}/api/artist`,
        'All Band': `http://localhost:${PORT}/api/band`,
        'All Label': `http://localhost:${PORT}/api/label`
    })
})

// shorten
const endpoint = [
    'album',
    'artist',
    'band', 
    'label'
]

//6-7 whenever someone click on /api/slbum, then used albumRoutes
//router.use('/api/album', require('./api/albumRoutes'))
//router.use('/api/artist', require('./api/artistRoutes'))

// shorten 
endpoint.forEach(endpoint => {
    router.use(`/api/${endpoint}`, require(`./api/${endpoint}Routes`))
})


// 6-2 error page
router.use((req, res, next)=> {
    res.status(404)
    .send('<h1> Error This page does not exist</h1>')
})

// 3-2
module.exports = router

//All individual routes will meet up HERE!
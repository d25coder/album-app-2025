//handle all the routing for the album table
// router object from express
//6-1
const express = require('express')
//6-2
const router = express.Router()

//6-4 pull albumDao and name it dao
//take out daos 
const { albumDao: dao } = require('../../daos/dao')


//6-5 when i click on localhost:300/api/album run the call back function 
router.get('/', (req, res)=> {
//6-6akes findAll method from daoCommon
//dao.table is being pulled from albumDao
//when i click on localhost:3000 i want it to findAll by going into daoCommons.js and SELECT * FROM table, the table comes from albumDao.js, then return the data in json
//where does dao.findAll come from? go to albumDao.js
    //dao.findAll(req, res, dao.table)
    
// 7- 4 ~comes from albumDao.js
    dao.findAlbumInfo(res, dao.table)
})

//~ albumDao.js
router.get('/get_albums/:id', (req, res)=> {
    dao.findAlbumsByArtistId(res, dao.table, req.params.id)
})


//3-2b localhost:3000/album/sort/yrReleased
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})




// 3-1B. comes from FIND INDIVIDUAL query in daoCommons.js
//going to the request obj, finding the params property and giving the id from that
//http:/localhost:3000/api/:id, give you the individual album
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})
//6-3
module.exports = router

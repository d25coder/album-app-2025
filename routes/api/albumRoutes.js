//handle all the routing for the album table
// router object from express
//6-1
const express = require('express')
//6-2
const router = express.Router()

//6-4 pull albumDao and name it dao
//go into daos folder and get albumDao from daos folder
const { albumDao: dao } = require('../../daos/dao')

//6-5 when i click on localhost:300/api/album 
router.get('/', (req, res)=> {
    
//6-6akes findAll method from daoCommon
//dao.table is being pulled from albumDao
//when i click on localhost:3000 i want it to findAll by going into daoCommons.js and SELECT * FROM table, the table comes from albumDao.js, then return the data in json
    dao.findAll(req, res, dao.table)
})

//6-3
module.exports = router

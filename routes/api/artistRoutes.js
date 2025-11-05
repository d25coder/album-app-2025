// 1
const router = require('express').Router()


//3 leave artistRoute ../ leave api folder ../leave routes
const { artistDao : dao } = require('../../daos/dao')

// 4 http://localhost:3000/api/artist
router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

router.get('/get_albums/:id', (req, res)=> {
    dao.findAlbumsByArtist(res, dao.table, req.params.id)
})

// 5 http://localhost:3000/api/artist/sort/sorter
router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})
//4
router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.sorter)
})

// 2
module.exports = router
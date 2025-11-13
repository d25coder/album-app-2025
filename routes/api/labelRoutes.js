const router = require('express').Router()

const { labelDao : dao } = require('../../daos/dao')

router.get('/', (req, res)=> {
    dao.findAll(req, res, dao.table)
})

router.get('/get_albums/:id', (req, res)=> {
    dao.findAlbumsByBand(res, dao.table, req.params.id)
})

router.get('/sort/:sorter', (req, res)=> {
    dao.sort(res, dao.table, req.params.sorter)
})

router.get('/:id', (req, res)=> {
    dao.findById(res, dao.table, req.params.id)
})

// POST
router.post('/created', (req, res)=> {
    dao.create(req, res, dao.table)
})

// PATCH
router.patch('/update/:id', (req, res)=> {
    dao.update(req, res, dao.table)
})

module.exports = router
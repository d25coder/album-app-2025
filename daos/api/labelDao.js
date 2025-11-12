const con = require('../../config/dbconfig')

const labelDao = {
    table: 'label',

    findAlbumsByLabel: (res, table, id)=> {
        let album = []

        let sql = `SELECT album_id, title, yr_released FROM album WHERE lebel_id = ${id};`
        con.execute(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        albums.push(obj) 
                    })
                    con.execute(
                        `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
                        (error, rows)=> {
                            rows.forEach(row => {
                                row.albums = albums
                            })
                            if (!error) {
                                res.json(...rows)
                            } else {
                                console.log('DAO Error:', error)
                            }
                        }
                    )
                } else {
                    res.json({
                        message: 'error',
                        table: `${table}`,
                        error: error 
                    })
                }
            }
        )
    }
}

module.exports = labelDao
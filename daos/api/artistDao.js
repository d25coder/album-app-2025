const con = require('../../config/dbconfig')



const artistDao = {
    table: 'artist',

//methods that are particular to the artist table

// Find album by artist
    findAlbumsByArtist: (res, table, id)=> {
        let albums = []

        let sql = `SELECT album_id, title, yr_released FROM album WHERE artist_id = ${id};`
// .execute(query, callback) mysql2
//.execute(query, array, callback function)
        con.query(
            sql,
            (error, rows)=> {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        albums.push(obj) 
                    })
                    // console.log(albums)
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
                    // res.send('sucess')
                } else {
                    // res.send('error') // Test Here
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

module.exports = artistDao
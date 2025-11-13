//can write queries specific to the album table
//may want to write something in album table that does not affect other tables
// 4-1
const con = require('../../config/dbconfig')
// 7- 3
const { queryAction } = require('../../helpers/queryAction')



// 4-2
const albumDao = {
    table: 'album', 
// we may want to write queries specific to album table
//7-1 return all info for this album
    findAlbumInfo: (res, table)=> {
        const sql = `SELECT al.album_id, al.title, al.artist_id, al.band_id, al.label_id, al.yr_released,
        CASE 
            WHEN ar.fName IS NULL THEN ''
            ELSE ar.fName
            END fName,
        CASE
            WHEN ar.lName IS NULL THEN ''
            ELSE ar.lName
            END lname,
        CASE
            WHEN b.band IS NULL THEN ''
            ELSE b.band
            END band,
        l.label
        FROM album al
        LEFT OUTER JOIN artist ar USING (artist_id)
        LEFT OUTER JOIN band b USING (band_id)
        JOIN label l USING (label_id)
        ORDER BY al.album_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },
    findAlbumsByArtistId: (res, table, id)=> {
        const sql = `SELECT title, album_id, yr_released FROM ${table} WHERE artist_id = ${id};`
        
        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    },

    createAlbum: (req, res, table)=> {
// capture fName, lName, band, and label
        const fName = req.body.fName
        const lName = req.body.lName
        const band = req.body.band 
        const label = req.body.label 


        let data = {
            artist_id: null,
            band_id: null,
            label_id: null 
        }
        let artist = {}

        
// check the database, check in artist table 
        con.execute(
        `SELECT * FROM artist;`,
            (error, rows)=> {
                if (!error) {
// if fName is not equal to nul and lName is not equal to null
//find artist where fName and lName are the same as artist.fName and artist.lName
                    if (fName != null || lName != null) {
                        artist = rows.find(artist => artist.fName == fName && artist.lName == lName)
                        console.log(artist)

// if artist is undefined add to artist table
                        if (artist == undefined) {
                            con.execute(
                                `INSERT INTO artist SET fName = "${fname}", lName = "${lName}";`
                                (error, dbres)=> {
                                    if (!error) {
                                        data.artist_id = dbres.insertId
                                        console.log(data.artist_id)
                                    } else{
                                        console.log(error)
                                    }
                                }
                            ) 
                        }
                    }
                }
            }
        )
        data = {
            aritst_id: artist.artist_id,
            band_id: null,
            label_id: null
        }
        res.json(data)
    }
}

// 4-3
module.exports = albumDao //go to daoCommon

//we may want to write queries specific to album table
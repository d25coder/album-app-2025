//can write queries specific to the album table
//may want to write something in album table that does not affect other tables
// 4-1
const con = require('../../config/dbconfig')
// 4-2
const albumDao = {
    table: 'album' //3
}

// 4-3
module.exports = albumDao 


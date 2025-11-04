//3-1 want to click on the http link from the terminal
const connect = require('../../config/dbconfig')

//3-2
const daoCommon = {
// create methods that will query the database
    findAll: (req, resp, table)=> {
//.query(sql query arg and callback func)
//query will return all the data from the table
// error,rows= callback func,
//if row length =1, the spreadout rows
//else if row length is 2 or greater give array of data
//if there is a error
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`Dao Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error 
                    })
                }
            }
        )
    }
}

//3-3 method for all table
module.exports = daoCommon
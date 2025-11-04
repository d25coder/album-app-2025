//3-1 want to click on the http link from the terminal
const connect = require('../../config/dbconfig')
//7-2 ~ DESTRUCT  queryAction
const { queryAction } = require('../../helpers/queryAction')




//3-2 FIND ALL
const daoCommon = {
// create methods that will query the database
    findAll: (req, res, table)=> {
//.query(sql query arg and callback func)
//query will return all the data from the table
// error,rows= callback func,
//if row length =1, the spreadout rows
//else if row length is 2 or greater give array of data
//if there is a error
        connect.query(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                queryAction(res, error, rows, table) //lines 17-31 located in Helper > queryAction file, prevents writing multi lines
                // if (!error) {
                //     if (rows.length === 1) {
                //         res.json(...rows)
                //     } else {
                //         res.json(rows)
                //     }
                // } else {
                //     console.log(`Dao Error: ${error}`)
                //     res.json({
                //         "message": 'error',
                //         'table': `${table}`,
                //         'error': error 
                //     })
                // }
            }
        )
    },


 //what if i want a specific id? How do we do that? 
//i want it applicable for each table   
//3-1a FIND INDIVIDUAL
    findById: (res, table, id)=> {

        connect.query(
            `SELECT * FROM ${table} WHERE ${table}_id = ${id}:`,
            (error, rows)=> {
                if (!error) {
                    res.json(...rows)
                } else {
                    console.log(`DAO Error: ${error}`)
                    res.json({
                        "message": 'error',
                        'table': `${table}`,
                        'error': error 
                    })
                }
            }
        )
    },



//3-2a SORT BY: Title, Album, or YrReleased
    sort: (res, table, sorter)=> {
        connect.query(
            `SELECT * FROM ${table} ORDER BY ${sorter}:`,
            (error, rows)=> {
                queryAction(res, error, rows, table)
                // if (!error) {
                //     if (rows.length == 1: {
                //         res.json(...rows)
                //     })
                // } else {
                //     console.log(`DAO Error: ${error}`)
                //      res.json({
                //         "message": 'error',
                //         'table': `${table}`,
                //         'error': error 
                //     })
                // }
            }
        )
    }
}

//3-3 method for all table
module.exports = daoCommon


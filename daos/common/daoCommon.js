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
            `SELECT * FROM ${table} WHERE ${table}_id = ${id};`,
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
            `SELECT * FROM ${table} ORDER BY ${sorter};`,
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
    },
 // req.body comes from the url .. go to server.js 
 // if object.keys is = 0, res.json> "No fields to create"
    create: (req, res, table)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            //join method add/join argument inside ()
            //insert into artist
        /**
         * req.body = {
         *      name: = des
         *      age: 30
         *      occupation: MSA
         *      favTeam: commanders
         * }
         *      fields = [name, age, occupation, favTeam]
         *      values = ['des, 30, MSA, commanders']
         * 
         *       fields = [0]
                 value = [0]
        */
            connect.execute(
                // where there ? import value
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values, 
                (error, dbres)=> {
                    if (!error){ //if no error
                        res.json({ // res Id
                            Last_id: dbres.insertId
                        })
                    } else { //elso res DAO error
                        console.log(`${table}Dao error:`, error)
                    }
                }
            )
        }
    },
// UPDATE
    update: (req, res, table)=> {
// check if id == number, if id equals a number, will not work
        if (isNaN(req.params.id)) {
            res.json({
                "error": true,
                "message": "Id must be a number"
            })
        } else if (Object.keys(req.body).length == 0) {
            res.json({
                "error": true,
                "message": "No fields to update"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            connect.execute(
                `UPDATE ${table}
                    SET ${fields.join(' = ?, ')} = ? WHERE ${table}_id = ?;`,
// values, req.param represent the second ?
                [...values, req.params.id],
                (error, dbres)=> {
                    if (!error) {
                        res.json({
                            "status": 'updated',
                            "changedRows": dbres.changedRows
                        })
                    } else {
                        res.json
                            "error": true,
                            "message": error 
                        })
                    }
                }  // go to artistRoutes.js to PATCH:
            )
        }
    }
}

//3-3 method for all table
module.exports = daoCommon


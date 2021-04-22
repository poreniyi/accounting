const DB = require("./DBConnection");

async function emptyThings(){
    let query = `SELECT NAME FROM MASTER`

    let [rows] = 
    await DB.asyncConnection.query(query)

    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]

        query = `DELETE FROM ${current.NAME}_LEDGER;`

        await DB.asyncConnection.query(query)

        query = `DELETE FROM ${current.NAME} WHERE EVENTID != 0;`

        await DB.asyncConnection.query(query)

}

    query = `update master set credit = 0, debit = 0, balance = 0;`

    await DB.asyncConnection.query(query)

    query = `delete from journal;`

    await DB.asyncConnection.query(query)

}

//emptyThings()

async function changeDates(){

    let query = `SELECT NAME FROM MASTER WHERE NAME != 'RetainedEarnings'`

    let [rows] = await DB.asyncConnection.query(query)

    let current

    for(var i = 0; i < [rows][0].length; i++){

        current = [rows][0][i]

        query = "ALTER TABLE `heroku_f886e82f73ac5d5`.`" + `${current.NAME}` + "_ledger` CHANGE COLUMN `DATECREATED` `DATECREATED` TIMESTAMP NULL ;"

        await DB.asyncConnection.query(query)

        query = `UPDATE ${current.NAME}_LEDGER SET DATESUBMITTED = DATECREATED `

        await DB.asyncConnection.query(query)

}
}

//changeDates()



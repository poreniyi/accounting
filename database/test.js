const DB = require("./DBConnection");

async function test(id){


    query = `SELECT USERNAME, ACCOUNT, DESCRIPTION, DEBIT, CREDIT, DATE FROM JOURNAL WHERE ID = '${id}'`

    let [rows] = await DB.asyncConnection.query(query)

    var accounts = []
    var BScounter = 0;
    var IScounter = 0;
    let current;


    for(var i = 0; i < [rows][0].length; i++){
        current = [rows][0][i]
        query = `SELECT CATEGORY FROM MASTER WHERE NAME = '${current.ACCOUNT}'`
        let [category] = await DB.asyncConnection.query(query)
        if([category][0][0].CATEGORY == 'Asset' || [category][0][0].CATEGORY == 'Liability' || [category][0][0].CATEGORY == 'Equity'){
            BScounter = BScounter + 1;
            console.log(BScounter)
        }
        else{
            IScounter = IScounter + 1;
        }
        accounts.push(current)
        }
}

test(100021)

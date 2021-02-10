import Account from '../chartClass/chartObject';


let exampleAccount={
    accountName:'String',//a
    Number:2,   //b
    description:5,  //c
    normalSide:'No clue',//dd
    category:'Asset',   //e
    subCategory:'Asset',   //f
    initialBalance:0,//g
    debit:506540,//h
    credit:78431,//i
    balance:0,//j
    DOC:new Date(),//k
    userID:'26481',//l
    order:5184,//m
    statement:64612,//n
    comment:'Acomment'//1
}
const Assets = new Account(exampleAccount);

console.log(Assets);
console.log(`example.js`);
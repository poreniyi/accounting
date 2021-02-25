
class Account{
    constructor(options={}){
        Object.assign(this,options);
    }
    get Debit(){
        return this.formattMoney(this.debit);
    }
    get Credit(){
        return this.formattMoney(this.credit);
    }
    formattMoney(value){
        let formatter = new Intl.NumberFormat('en-US',{     //do on browser
            style: 'currency',
            currency: 'USD',
        })
        return formatter.format(value);
    }
    get Balance(){
        return this.formattMoney(this.debit-this.credit);
    }
    get creationDate(){
        return `${this.DOC.getMonth()+1}/${this.DOC.getDate()}/${this.DOC.getFullYear()}`;
    }
}
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
//console.log(Assets);
console.log(Assets.Debit);
console.log(Assets.Credit);
console.log(typeof Assets.Credit);
console.log(Assets.Balance);
console.log(Assets.creationDate);

//module.exports=Account;
module.exports= Account;
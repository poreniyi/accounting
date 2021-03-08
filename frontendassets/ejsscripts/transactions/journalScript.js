let htmlTable = document.getElementById('table');
let tableRows = [];
let addAccount = document.getElementById('addAccount');
let totalDebit = document.getElementById('totalDebit');
let totalCredit = document.getElementById('totalCredit');
let balanceMessage = document.getElementById('balanceMessage');
let form = document.getElementById('form');
let submitButton=document.getElementById('submitButton');
let firstRow = htmlTable.rows[1];
let resetButton=document.getElementById('resetButton');

form.addEventListener('reset',()=>{
    totalCredit.textContent='';
    totalDebit.textContent='';
    balanceMessage.textContent='';
    balanceMessage.style.backgroundColor='';
})

firstRow.cells[2].children[0].addEventListener('keyup', () => {
    addTotal('Debits', totalDebit);
})
firstRow.cells[2].children[0].addEventListener('change', () => {
    addTotal('Debits', totalDebit);
})
firstRow.cells[3].children[0].addEventListener('keyup', () => {
    addTotal('Credits', totalCredit);
})
firstRow.cells[3].children[0].addEventListener('change', () => {
    addTotal('Credits', totalCredit);
})
addAccount.addEventListener('click', (e) => {
    e.preventDefault();
    if (htmlTable.rows.length == 11) {
        addAccount.style.visibility = 'hidden';
        return;
    };
    let tableLength = htmlTable.rows.length - 1;
    let newRow = htmlTable.insertRow(tableLength);
    let rowNumber = newRow.insertCell();
    rowNumber.textContent = tableLength;
    let account = newRow.insertCell();
    let debit = newRow.insertCell();
    let credit = newRow.insertCell();
    let close = newRow.insertCell();
    close.textContent = 'Remove Account';
    close.colSpan = 2;
    close.addEventListener('click', () => {
        let counter = 1;
        close.parentElement.remove();
    })
    newRow.insertCell();
    let creditInput = document.createElement('input');
    let debitInput = document.createElement('input');
    let accountInput = document.createElement('input');
    creditInput.name = 'Credits';
    creditInput.type = 'number';
    creditInput.min=0;
    debitInput.type = 'number';
    debitInput.name = 'Debits';
    debitInput.min=0;
    accountInput.type = 'text';
    accountInput.name = 'Account';
    accountInput.required= true;
    credit.appendChild(creditInput);
    debit.appendChild(debitInput);
    account.appendChild(accountInput);
    credit.addEventListener('keyup', () => {
        addTotal('Credits', totalCredit);
    })
    credit.addEventListener('change', () => {
        addTotal('Credits', totalCredit);
    })
    debit.addEventListener('keyup', () => {
        addTotal('Debits', totalDebit);
    })
    debit.addEventListener('change', () => {
        addTotal('Debits', totalDebit);
    })
})

addTotal = (column, accumulator) => {
    let string = `input[name=${column}]`
    let values = [...document.querySelectorAll(string)];
    let grandTotal = 0;
    values.forEach(element => {
        grandTotal += Number(element.value);
    })
    accumulator.textContent = grandTotal;
    makeBalanceMessage();
}

let makeBalanceMessage = () => {
    let balance = Number(totalCredit.textContent) - Number(totalDebit.textContent)
    let message1,message3,message2;
    let isCorrectLength,hasValue,isBalanced;
    if(htmlTable.rows.length==3){
        message1 = "Please add another account";
        isCorrectLength=false;
    }else {
        message1 = "";
        isCorrectLength=true
    }
    for(let i=1;i<htmlTable.rows.length-1;i++){   
     let row=htmlTable.rows[i].cells;
        let credit=row[3].children[0];
        let debit=row[2].children[0];
        let debitValue=Number(debit.value);
        let creditValue=Number(credit.value);
        if(!debitValue&&!creditValue){
            hasValue=false;
            message2 = "Make sure every account has at least 1 debit or credit";
            console.log(`credit:${creditValue} debit:${debitValue}`);
            console.log(`row${i+1} is the problem`);
        }else{
            message2='';
            hasValue=true;
        }
    } if (balance > 0) {
        isBalanced=false;
        message3 = `Credits are ${balance} higher than Debits
        \n Please check the credit and debit values`
    } else if (balance < 0) {
        isBalanced=false;
        message3 = `Credits are ${balance}lower than Debits
        \n Please check the credit and debit values`
    } else {
        isBalanced=true;
        message3 = "";
    }
    let isValidJournal=isCorrectLength&&hasValue&&isBalanced? true:false;
    if(isValidJournal){
        submitButton.style.visibility='visible';
        balanceMessage.style.backgroundColor='green';
        balanceMessage.textContent = "\u2713 Can be submitted";
    }else{
        submitButton.style.visibility='hidden';
        balanceMessage.style.backgroundColor='red';
        balanceMessage.textContent=message1+message2+message3;
    }
}
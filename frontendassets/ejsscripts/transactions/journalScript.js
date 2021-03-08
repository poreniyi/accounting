let htmlTable = document.getElementById('table');
let tableRows = [];
let addAccount = document.getElementById('addAccount');
let totalDebit = document.getElementById('totalDebit');
let totalCredit = document.getElementById('totalCredit');
let balanceMessage = document.getElementById('balanceMessage');
let form = document.getElementById('form');
let submitButton=document.getElementById('submitButton');
let firstRow = htmlTable.rows[1];


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
    debitInput.type = 'number';
    debitInput.name = 'Debits';
    accountInput.type = 'text';
    accountInput.name = 'Account';
    console.log(creditInput.form);
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
tableRows.push(htmlTable.rows[1]);

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
    if (balance > 0) {
        submitButton.style.visibility='hidden';
        balanceMessage.textContent = `Credits are ${balance} higher than Debits
        \n Please check the credit and debit values`
        balanceMessage.style.backgroundColor='red';
    } else if (balance < 0) {
        submitButton.style.visibility='hidden';
        balanceMessage.textContent = `Credits are ${balance}lower than Debits
        \n Please check the credit and debit values`
        balanceMessage.style.backgroundColor='red';
    } else {
        submitButton.style.visibility='visible';
        balanceMessage.textContent = "\u2713 Can be submitted";
        balanceMessage.style.backgroundColor='green';
    }
}
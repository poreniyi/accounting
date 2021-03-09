let htmlTable = document.getElementById('table');
let tableRows = [];
let addAccount = document.getElementById('addAccount');
let totalDebit = document.getElementById('totalDebit');
let totalCredit = document.getElementById('totalCredit');
let balanceMessage = document.getElementById('balanceMessage');
let form = document.getElementById('form');
let submitButton = document.getElementById('submitButton');
let firstRow = htmlTable.rows[1];
let resetButton = document.getElementById('resetButton');
let isValidJournal = false;
form.addEventListener('reset', (e) => {
    totalCredit.textContent = '';
    totalDebit.textContent = '';
    balanceMessage.textContent = '';
    balanceMessage.style.backgroundColor = '';
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let val = firstRow.cells[1].children[0].value;
    let isCorrectName = isValidAccount(val)
    if (!isCorrectName) {
        alert('invalid Account Name');
    } else if (!isValidJournal) { 
        alert('fix errors');
    }
    else {
        form.submit();
    }
    return val;
})



firstRow.cells[2].children[0].addEventListener('input', () => {
    addTotal('Debits', totalDebit);
})

firstRow.cells[3].children[0].addEventListener('input', () => {
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
    creditInput.min = 0;
    debitInput.type = 'number';
    debitInput.name = 'Debits';
    debitInput.min = 0;
    accountInput.type = 'text';
    accountInput.name = 'Account';
    accountInput.setAttribute('list', 'AccountNamesList')
    accountInput.list = 'AccountNamesList';
    accountInput.required = true;
    credit.appendChild(creditInput);
    debit.appendChild(debitInput);
    account.appendChild(accountInput);
    credit.addEventListener('input', () => {
        addTotal('Credits', totalCredit);
    })
    debit.addEventListener('input', () => {
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
    let message1, message3, message2,message4;
    let isCorrectLength, hasValue, isBalanced;
    let namesAreUnique=true;
    if (htmlTable.rows.length == 3) {
        message1 = "Please add another account";
        isCorrectLength = false;
    } else {
        message1 = "";
        isCorrectLength = true
    }
    let AccountNamesList=[];
    for (let i = 1; i < htmlTable.rows.length - 1; i++) {
        let row = htmlTable.rows[i].cells;
        let credit = row[3].children[0];
        let debit = row[2].children[0];
        let account = row[1].children[0];
       // let accountValue=account.value ||acc
       AccountNamesList.push(account.value);
       if(AccountNamesList.includes(account.value)){
           namesAreUnique=false;
           message4="An account name is repeated please check"
       }else{
           message4='';
       }
        let debitValue = Number(debit.value);
        let creditValue = Number(credit.value);
        if (!debitValue && !creditValue) {
            hasValue = false;
            message2 = "Make sure every account has at least 1 debit or credit";
            console.log(`credit:${creditValue} debit:${debitValue}`);
            console.log(`row${i + 1} is the problem`);
        } else {
            message2 = '';
            hasValue = true;
        }
    } if (balance > 0) {
        isBalanced = false;
        message3 = `Credits are ${balance} higher than Debits
        \n Please check the credit and debit values`
    } else if (balance < 0) {
        isBalanced = false;
        message3 = `Credits are ${balance}lower than Debits
        \n Please check the credit and debit values`
    } else {
        isBalanced = true;
        message3 = "";
    }
    isValidJournal = namesAreUnique&&isCorrectLength && hasValue && isBalanced ? true : false;
    if (isValidJournal) {
        submitButton.style.visibility = 'visible';
        balanceMessage.style.backgroundColor = 'green';
        balanceMessage.textContent = "\u2713 Can be submitted";
    } else {
        submitButton.style.visibility = 'hidden';
        balanceMessage.style.backgroundColor = 'red';
        balanceMessage.textContent = message1 + message2 + message3+message4;
    }
}

let isValidAccount = () => {
    let accountInputs = [...document.querySelectorAll("input[name='Account']")];
    let isValid = true;
    accountInputs.forEach(element => {
        console.log(element.value);
        var option = document.querySelector("#" + 'AccountNamesList' + " option[value='" + element.value + "']");
        if (element.value && option == null) {
            isValid = false;
            return;
        }
    })
    return isValid;
}
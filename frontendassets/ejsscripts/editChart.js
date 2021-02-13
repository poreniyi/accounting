let editButton= document.getElementById('Edit');
let addButton= document.getElementById('Add');
let deactivateButton= document.getElementById('Deactivate');
let hiddenInput=document.getElementById('hiddenNumber');
let cashInput=document.getElementById('cashInput');

cashInput.addEventListener('input',()=>{
    let regex=/[^\d$.,]/
    if(regex.test(cashInput.value)){
        console.log(`replace value detected`)
        cashInput.value =  cashInput.value.replace(/[^\d$.,]/,'');
    }
})
cashInput.addEventListener('change',()=>{
    hiddenInput.value=cashInput.value;

    let formatter = new Intl.NumberFormat('en-US',{     
        style: 'currency',
        currency: 'USD',
    })
     let cash=cashInput.value;
     cash=cash.replace(/\D/,'');
     cash=cash.replace('.','');
     cash=cash.replace(',','');

     cash=Number(cash);
     console.log(`cash is ${cash}`);
     cash=formatter.format(cash);
     if(typeof cash!='number'){
        let newVal=formatter.format(cashInput.value)
        console.log(`Test val is ${newVal}`);
         console.log(`Error with cash amount ${cash}`);
     }
     console.log(typeof cash)
    cashInput.value=cash;
})
140,026,26.00
let data={
    Name:'Acount2',
    Credit: 5000,
}
editButton.addEventListener('click',async() => {
    let stringfiedDta=JSON.stringify(data);
    let request= await fetch('./edit',{method:'PUT',body: stringfiedDta, headers: {"Content-type": "application/json; charset=UTF-8"}});
    let json= await request.json();
    console.log(json);
})
addButton.addEventListener('click',async() => {
    let stringfiedDta=JSON.stringify(data);
    let request= await fetch('./edit',{method:'POST',body: stringfiedDta, headers: {"Content-type": "application/json; charset=UTF-8"}});
    let json= await request.json();
    console.log(json);
})
deactivateButton.addEventListener('click',async() => {
    let data2={
        Name:'Acount2',
        Credit: 5000,
        Status:'Activated'
    }
    let stringfiedDta=JSON.stringify(data2);
    let request= await fetch('./deactivate',{method:'PUT',body: stringfiedDta, headers: {"Content-type": "application/json; charset=UTF-8"}});
    let json= await request.json();
    console.log(json);
})

let makeChange=(location,data,type) =>{
    
}


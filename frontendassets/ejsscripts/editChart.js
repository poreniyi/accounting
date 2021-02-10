let editButton= document.getElementById('Edit');
let addButton= document.getElementById('Add');
let deactivateButton= document.getElementById('Deactivate');
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


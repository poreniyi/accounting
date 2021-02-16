let table = document.getElementById('table');
let input = document.getElementById('search');

let tr=table.getElementsByTagName('tr');
let td,textValue;
let cell = tr[1].getElementsByTagName('td')[0];
console.log(`TD1 is ${cell.textContent}`)
console.log(tr.length);
input.addEventListener('keyup',() =>{
    let filter=input.value.toUpperCase();

    for(let i = 0; i < tr.length; i++){
        td= tr[i].getElementsByTagName('td')[0];
        if(td){
            textValue= td.textContent;
            console.log(textValue);
            if(textValue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display='';
            }else{
                tr[i].style.display='none';
            }
        }
    }
})

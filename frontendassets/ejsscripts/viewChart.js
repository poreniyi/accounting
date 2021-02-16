let table = document.getElementById('table');
let input = document.getElementById('search');

let tr=table.getElementsByTagName('tr');
let tableHeaders=document.getElementsByTagName('th');
let select=document.getElementById('searchSelect');
let td,textValue,searchCategory;
searchCategory=0;
select.addEventListener('change',() => {
    searchCategory=select.value;
    console.log(searchCategory);
})


input.addEventListener('keyup',() =>{
    let filter=input.value.toUpperCase();
    for(let i = 0; i < tr.length; i++){
        td= tr[i].getElementsByTagName('td')[searchCategory];
        if(td){
            textValue= td.textContent;
            console.log(textValue);
            if(textValue.toUpperCase().indexOf(filter)>-1){
                tr[i].style.display='';
                td.classList.toggle('searchMatchedText');
            }else{
                tr[i].style.display='none';
                td.classList.toggle('searchMatchedText');
            }
        }
    }
})

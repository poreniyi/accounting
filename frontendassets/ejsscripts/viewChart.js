let table = document.getElementById('table');
let input = document.getElementById('search');

let tr=table.getElementsByTagName('tr');
let tableHeaders=document.getElementsByTagName('th');
let select=document.getElementById('searchSelect');
let td,textValue,searchCategory,placeHolderText;
searchCategory=0;
let selectOptions=select.options;
select.addEventListener('change',() => {
    console.log(selectOptions[select.selectedIndex].text)
    placeHolderText=selectOptions[select.selectedIndex].text;
    input.placeholder=`Search on ${placeHolderText}...`;
    searchCategory=select.value;
    for(let i=0 ; i<tr.length ; i++){
        td= tr[i].getElementsByTagName('td');
        for(let j = 0 ;j<td.length;j++){
            if(j==searchCategory){
                console.log(td[j]);
                 td[j].classList.add('searchMatchedText');
            }else{
                td[j].classList.remove('searchMatchedText');
            }
        }
    }
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
            }else{
                tr[i].style.display='none';
            }
        }
    }
})

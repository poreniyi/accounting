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

let headers=[...document.getElementsByTagName('TH')];
for(let i=0;i<headers.length;i++){
    let isClicked=1;
    headers[i].addEventListener('click',()=>{  
    if(isClicked){
        headers[i].textContent=headers[i].textContent.slice(0,-1)+'\u25B2';
        isClicked=0
    } else{
        headers[i].textContent=headers[i].textContent.slice(0,-1)+'\u25BC';
        isClicked=1;
    }
    sortUsernames(i);
    })
}

let sortUsernames=(n)=>{
    var  rows, switching, i, x, y, shouldSwitch,switchcount=0;
    let dir='asc';
 switching=true;
    while(switching){
        switching = false;
        rows=table.rows;
        for(i=1;i<(rows.length-1);i++){
            shouldSwitch=false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            let xval=x.textContent.toLowerCase();
            let yval=y.textContent.toLowerCase();
            if(dir=='asc'){
                if(xval>yval){
                    shouldSwitch=true;
                    break;
                }
            }else if (dir=='desc'){
                if(xval<yval){
                    shouldSwitch=true;
                    break;
                }
            }    
        }
        if(shouldSwitch){
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            switching=true;
            switchcount++;
        }else{
            if(switchcount==0 &&dir=='asc'){
                dir = "desc";
                switching = true;
            }
        }
    }  
}
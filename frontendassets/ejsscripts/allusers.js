let userNames=document.getElementById('userNameHeader');
let firstNames=document.getElementById('firstNameHeader');
let lastNames=document.getElementById('lastNameHeader');
let types=document.getElementById('typeHeader');
let status=document.getElementById('statusHeader');
let table=document.getElementById('table');
console.log(table.rows);
let headers=[];
headers.push(userNames);
headers.push(firstNames);
headers.push(lastNames);
headers.push(types);
headers.push(status);

for(let i=0;i<headers.length;i++){
    console.log(headers[i]);
    headers[i].addEventListener('click',()=>{
    sortUsernames(i);
    })
}

// userNames.addEventListener('click',()=>{
//     sortUsernames(0);
// })
// firstNames.addEventListener('click',()=>{
//     sortUsernames(1);
// })

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
console.log(userNames);
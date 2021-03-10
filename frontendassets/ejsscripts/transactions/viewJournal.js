let table = document.getElementById('table');
let search = document.getElementById('search');
let select = document.getElementById('select');
let dateRanges=[...document.getElementsByClassName('dateRange')];
let tr = table.rows;
let searchCategory = select[select.selectedIndex].value;
search.placeholder = select[select.selectedIndex].textContent;

select.addEventListener('change', () => {
    searchCategory = select[select.selectedIndex].value;
    let placeholder = select[select.selectedIndex].textContent;
    search.placeholder = placeholder;
})

console.log(dateRanges);
dateRanges.forEach(element=>{
    element.addEventListener('change',()=>{
        let date1=new Date(dateRanges[0].value);
        let date2=new Date(dateRanges[1].value);
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[0];
            if (td) {
                    let selectedDate = new Date(td.textContent);
                    if (date1.getTime()<selectedDate.getTime()<date2.getTime()) {
                        tr[i].style.display = '';
                    } else {
                        tr[i].style.display = 'none';
                    }
            }
        }
    })
})
let filterDate = () => {

}
search.addEventListener('keyup', () => {
    let filter = search.value.toUpperCase();
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[searchCategory];
        if (td) {
                textValue = td.textContent;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
        }
    }
})

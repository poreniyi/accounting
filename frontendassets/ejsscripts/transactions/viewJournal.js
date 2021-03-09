let textHeaders = document.getElementsByClassName('textHeader');
let dateHeader = document.getElementsByTagName('date');
let table = document.getElementById('table');
let search = document.getElementById('search');
let select = document.getElementById('select');
let tr = table.rows;
let searchCategory = select[select.selectedIndex].value;
search.placeholder = select[select.selectedIndex].textContent;

select.addEventListener('change', () => {
    searchCategory = select[select.selectedIndex].value;
    let placeholder = select[select.selectedIndex].textContent;
    search.placeholder = placeholder;
})

let filterDate = () => {

}
search.addEventListener('keyup', () => {
    let filter = search.value.toUpperCase();
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[searchCategory];
        if (td) {
            if (select[select.selectedIndex].textContent == 'Date') {
                let filterDate = new Date(filter);
                let tdDate = new Date(td.textContent);
               // console.log(`Date1:${filterDate} Date2:${tdDate}`);
                console.log(filterDate.getTime() === tdDate.getTime());
                if (filterDate.getTime() === tdDate.getTime()) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            } else {
                textValue = td.textContent;
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = '';
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    }
})

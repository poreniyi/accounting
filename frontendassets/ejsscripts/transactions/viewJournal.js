
let table = document.getElementById('table');
let search = document.getElementById('search');
let select = document.getElementById('select');
let dateRanges = [...document.getElementsByClassName('dateRange')];
let tr = [...table.rows];
let searchCategory = select[select.selectedIndex].value;
search.placeholder = select[select.selectedIndex].textContent;

select.addEventListener('change', () => {
    searchCategory = select[select.selectedIndex].value;
    let placeholder = select[select.selectedIndex].textContent;
    search.placeholder = placeholder;
})

dateRanges.forEach(element => {
    element.addEventListener('change', () => {
        let date1 = new Date(dateRanges[0].value);
        let date2 = new Date(dateRanges[1].value);
        for (let i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName('td')[0];
            if (td) {
                let selectedDate = new Date(td.textContent);
                if (date1.getTime() < selectedDate.getTime() < date2.getTime()) {
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

let pagination = () => {
    let tableRows = [...document.getElementsByClassName('transactions')];
    let shown = tableRows.slice(0, 10);
    let pageSize = 10;
    console.log(`There are:${tableRows.length} transactions`);
    let totalPages = Math.ceil(tableRows.length / 10);
    let pageButtons = document.getElementById('pageButtons');
    let next = document.getElementById('nextButton');
    let previous = document.getElementById('previousButton');
    console.log(`length of total pages is ${totalPages}`);
    let pages = [];
    for (let i = 0; i < totalPages; i++) {
        let pageNumber = document.createElement('span');
        pages.push(pageNumber);
        pageNumber.classList.add('boxed');
        pageNumber.textContent = `${i + 1}`
        pageButtons.insertBefore(pageNumber, next);
    }
    let currentPage = 0
    pages[currentPage].classList.toggle('currentPage', true);
    next.addEventListener('click', () => {
        previous.disabled = false;
        if (currentPage + 1 == totalPages) {
            next.disabled = true;
            return;
        }
        switchPage('forward', pageSize, currentPage)
        currentPage += 1
        highlightNewNumber(pages,currentPage);
    })
    previous.addEventListener('click', () => {
        next.disabled = false;
        if (currentPage == 0) {
            return;
        } next.disabled = false;
        switchPage('back', pageSize, currentPage);
        currentPage -= 1;
        highlightNewNumber(pages,currentPage);
    })

    console.log(totalPages);
    for (let i = 0; i < shown.length; i++) {
        //console.log(`default for ${shown[i]}is:${shown[i].style.visibility}`);
        shown[i].classList.toggle('transactions', false);
    }
}//
pagination();

let switchPage = (direction, pagesize, currentPage) => {
    let slice = 0;
    if (direction == 'forward') {
        slice = pagesize * (currentPage + 1) + 1;
    } else {
        slice = pagesize * (currentPage - 1) + 1;
    }
    for (let i = 1; i < tr.length; i++) {
        tr[i].classList.toggle('transactions', true);
    }
    let shownPages = tr.slice(slice, slice + 10);
    for (let i = 0; i < shownPages.length; i++) {
        shownPages[i].classList.toggle('transactions', false);
    }

}
let highlightNewNumber = (array, newCurrentPage) => {
    for (let i = 0; i < array.length; i++) {
        if(i==newCurrentPage){
            array[i].classList.toggle('currentPage', true);
        }else{
            array[i].classList.toggle('currentPage', false);
        }
    }
}
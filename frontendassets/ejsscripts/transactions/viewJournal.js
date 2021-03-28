
let table = document.getElementById('table');
let search = document.getElementById('search');
let select = document.getElementById('select');
let dateRanges = [...document.getElementsByClassName('dateRange')];
let tr = [...table.rows];
tr.shift();
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
            td = tr[i].getElementsByTagName('td')[1];
            if (td) {
                let selectedDate = new Date(td.textContent);
                if (date1.getTime() < selectedDate.getTime() && selectedDate.getTime() < date2.getTime()) {
                    tr[i].style.display = 'table-row';
                    console.log(tr[i].style.display)
                } else {
                    tr[i].style.display = 'none';
                }
            }
        }
    })
})

search.addEventListener('keyup', () => {
    let filter = search.value.toUpperCase();
    let newRows = [];
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[searchCategory];
        if (td) {
            textValue = td.textContent;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].classList.toggle('transactions', false);
                newRows.push(tr[i]);
                tr[i].style.display = '';
            } else {
                tr[i].classList.toggle('transactions', true);
                tr[i].style.display = 'none';
            }
        }
    }
    for (let i = 0; i < newRows.length; i++) {
        newRows[i].cells[0].textContent = i + 1;
    }
    pagination(newRows);
})
let initialTable = [...document.getElementsByClassName('transactions')];
let pagination = (rows) => {
    let shown = rows.slice(0, 10);
    let pageSize = 10;
    //console.log(`There are:${rows.length} transactions`);
    let totalPages = Math.ceil(rows.length / 10);
    let pageButtons = document.getElementById('pageButtons');
    let next = document.getElementById('nextButton');
    let previous = document.getElementById('previousButton');
    // console.log(`length of total pages is ${totalPages}`);
    let pages = [];
    let previousPageNumbers = [...pageButtons.getElementsByClassName('boxed')];
    previousPageNumbers.forEach(element => {
        element.parentNode.removeChild(element);
    })
    for (let i = 0; i < totalPages; i++) {
        let pageNumber = document.createElement('span');
        pages.push(pageNumber);
        pageNumber.classList.add('boxed');
        pageNumber.textContent = `${i + 1}`
        pageButtons.insertBefore(pageNumber, next);
    }
    let currentPage = 0
    next.disabled = false;
    previous.disabled = false;
    pages[currentPage].classList.toggle('currentPage', true);

    next.addEventListener('click', () => {
        let possiblePage = currentPage + 2;
        previous.disabled = false;
        console.log(`New possiblePage page is ${possiblePage} totalPages is ${totalPages}`)
        if (possiblePage > totalPages) {
            next.disabled = true;
            return;
        }
        switchPage('forward', pageSize, currentPage, rows)
        currentPage += 1
        highlightNewNumber(pages, currentPage);
    })
    previous.addEventListener('click', () => {
        let possiblePage = currentPage;
        next.disabled = false;
        if (currentPage == 0) {
            return;
        } next.disabled = false;
        console.log(`New possiblePage page is ${possiblePage} totalPages is ${totalPages}`)
        switchPage('back', pageSize, currentPage, rows);
        currentPage -= 1;
        highlightNewNumber(pages, currentPage);
    })

    for (let i = 0; i < shown.length; i++) {
        shown[i].classList.toggle('transactions', false);
    }
}//
let nextEventListenerExits=true;
let addPageEventListeners=()=>{
    console.log(`New possiblePage page is ${possiblePage} totalPages is ${totalPages}`)

}
let switchPage = (direction, pagesize, currentPage, rows) => {
    let slice = 0;
    if (direction == 'forward') {
        slice = pagesize * (currentPage + 1);
    } else {
        slice = pagesize * (currentPage - 1);
    }
    for (let i = 0; i < tr.length; i++) {
        tr[i].classList.toggle('transactions', true);
    }
    let shownPages = rows.slice(slice, slice + 10);
    for (let i = 0; i < shownPages.length; i++) {
        shownPages[i].classList.toggle('transactions', false);
    }

}
let highlightNewNumber = (array, newCurrentPage) => {
    for (let i = 0; i < array.length; i++) {
        if (i == newCurrentPage) {
            array[i].classList.toggle('currentPage', true);
        } else {
            array[i].classList.toggle('currentPage', false);
        }
    }
}
pagination(initialTable);

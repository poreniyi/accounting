let form = document.getElementById('form');
let periodSelect = document.getElementById('periodSelect')
let periods = document.getElementById('periods');
let dateIsManual = false;

let newStart,newEnd;


periodSelect.addEventListener('change', () => {
    let currentVal = periodSelect.options[periodSelect.selectedIndex].value
    console.log(currentVal)
    if (currentVal == 'Manual') {
        dateIsManual=true
        console.log('hi')
    }else dateIsManual=false
})


form.addEventListener('submit', (e) => {
    if (!dateIsManual) {
        e.preventDefault();
    } else form.submit()
})
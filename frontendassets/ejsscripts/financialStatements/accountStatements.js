let form = document.getElementById('form');
let periodSelect = document.getElementById('periodSelect')
let periods = document.getElementById('periods');
let dateIsManual = false;
let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')

let newStart, newEnd;


periodSelect.addEventListener('change', () => {
    let currentVal = periodSelect.options[periodSelect.selectedIndex].value
    if (currentVal == 'Manual') {
        dateIsManual = true
    } else dateIsManual = false
    switch (currentVal) {
        case "Manual":
            dateIsManual = true
            makeManualDate();
            break;
        case "Yearly":
            makeYearDate();
            break;
        case "Quarterly":
        case "Monthly":
            makeMonthDate();
        case "Weekly":
    }
})


form.addEventListener('submit', (e) => {
    // if (!dateIsManual) {
    //     e.preventDefault();
    // } else form.submit()
})

let makeYearDate = () => {
    document.getElementById('years').style.display = ''
    document.getElementById('quarters').style.display = 'none'
    document.getElementById('months').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    startDate.disabled = true
    endDate.disabled = true
    let yearSelect = document.getElementById('years');
    let yearValue = yearSelect.options[yearSelect.selectedIndex].value
    startDate.value = `${yearValue}-01-01`
    endDate.value = `${yearValue}-12-31`; 
    yearSelect.addEventListener('change', () => {
        yearValue = yearSelect.options[yearSelect.selectedIndex].value
        startDate.value = `${yearValue}-01-01`
        endDate.value = `${yearValue}-12-31`;

    })

}

let makeQuarterDate = () => {

}
let makeMonthDate = () => {
    document.getElementById('quarters').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    document.getElementById('years').style.display = ''
    document.getElementById('months').style.display = ''
    let monthSelect=document.getElementById('months');
    let yearSelect=document.getElementById('years');
    let yearValue = yearSelect.options[yearSelect.selectedIndex].value
    let monthValue = monthSelect.options[monthSelect.selectedIndex].value

}

let makeManualDate=()=>{
    document.getElementById('years').style.display = 'none'
    document.getElementById('quarters').style.display = 'none'
    document.getElementById('months').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    startDate.disabled = false
    endDate.disabled = false
    console.log('am I being run')
}
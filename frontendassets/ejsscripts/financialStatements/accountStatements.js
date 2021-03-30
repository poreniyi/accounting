let form = document.getElementById('form');
let periodSelect = document.getElementById('periodSelect')
let startDate = document.getElementById('startDate')
let endDate = document.getElementById('endDate')

let newStart, newEnd;


periodSelect.addEventListener('change', () => {
    let currentVal = periodSelect.options[periodSelect.selectedIndex].value
    switch (currentVal) {
        case "Manual":
            makeManualDate();
            break;
        case "Yearly":
            makeYearDate();
            break;
        case "Quarterly":
            makeQuarterDate()
            break;
        case "Monthly":
            makeMonthDate();
            break
        case "Weekly":
    }
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
const formatter = new Intl.DateTimeFormat('us', { month: '2-digit' })
let makeQuarterDate = () => {
    document.getElementById('years').style.display = ''
    document.getElementById('quarters').style.display = ''
    document.getElementById('months').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    let yearSelect = document.getElementById('years');
    let quartersSelect = document.getElementById('quarters');
    let yearValue = yearSelect.options[yearSelect.selectedIndex].value
    let quartersValue = quartersSelect.options[quartersSelect.selectedIndex].value
    let quarterEndMonth=Number(quartersValue)*3;
    quarterEndMonth=('0'+quarterEndMonth).slice(-2)
    let quarterStartMonth=quarterEndMonth-2;
    quarterStartMonth=('0'+quarterStartMonth).slice(-2)
    let endDayDate = new Date(yearValue, quarterEndMonth, 0);
    let endDay = endDayDate.getDate();
    let startLastDayDate=new Date(yearValue, quarterStartMonth, 0);
    let startLastDay= startLastDayDate.getDate();
    startDate.value = `${yearValue}-${quarterStartMonth}-${startLastDay}`
    endDate.value = `${yearValue}-${quarterEndMonth}-${endDay}`
    yearSelect.addEventListener('change', () => {
        yearValue = yearSelect.options[yearSelect.selectedIndex].value
        let quarterEndMonth=Number(quartersValue)*3;
        quarterEndMonth=('0'+quarterEndMonth).slice(-2)
        let quarterStartMonth=quarterEndMonth-2;
        quarterStartMonth=('0'+quarterStartMonth).slice(-2)
        let endDayDate = new Date(yearValue, quarterEndMonth, 0);
        let endDay = endDayDate.getDate();
        let startLastDayDate=new Date(yearValue, quarterStartMonth, 0);
        let startLastDay= startLastDayDate.getDate();
        startDate.value = `${yearValue}-${quarterStartMonth}-${startLastDay}`
        endDate.value = `${yearValue}-${quarterEndMonth}-${endDay}`
    })
    quartersSelect.addEventListener('change', () => {
        quartersValue = quartersSelect.options[quartersSelect.selectedIndex].value
        let quarterEndMonth=Number(quartersValue)*3;
        quarterEndMonth=('0'+quarterEndMonth).slice(-2)
        let quarterStartMonth=quarterEndMonth-2;
        quarterStartMonth=('0'+quarterStartMonth).slice(-2)
        let endDayDate = new Date(yearValue, quarterEndMonth, 0);
        let endDay = endDayDate.getDate();
        let startLastDayDate=new Date(yearValue, quarterStartMonth, 0);
        let startLastDay= startLastDayDate.getDate();
        startDate.value = `${yearValue}-${quarterStartMonth}-${startLastDay}`
        endDate.value = `${yearValue}-${quarterEndMonth}-${endDay}`
    })
}
let makeMonthDate = () => {
    document.getElementById('quarters').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    document.getElementById('years').style.display = ''
    document.getElementById('months').style.display = ''
    let monthSelect = document.getElementById('months');
    let yearSelect = document.getElementById('years');
    let yearValue = yearSelect.options[yearSelect.selectedIndex].value
    let monthValue = monthSelect.options[monthSelect.selectedIndex].value
    startDate.value = `${yearValue}-${monthValue}-01`
    let lastDayDate = new Date(yearValue, monthValue, 0);
    let lastDay = lastDayDate.getDate();
    endDate.value = `${yearValue}-${monthValue}-${lastDay}`
    yearSelect.addEventListener('change', () => {
        yearValue = yearSelect.options[yearSelect.selectedIndex].value
        lastDayDate = new Date(yearValue, monthValue, 0);
        lastDay = lastDayDate.getDate();
        startDate.value = `${yearValue}-${monthValue}-01`
        endDate.value = `${yearValue}-${monthValue}-${lastDay}`
    })
    monthSelect.addEventListener('change', () => {
        monthValue = monthSelect.options[monthSelect.selectedIndex].value
        lastDayDate = new Date(yearValue, monthValue, 0);
        lastDay = lastDayDate.getDate();
        startDate.value = `${yearValue}-${monthValue}-01`
        endDate.value = `${yearValue}-${monthValue}-${lastDay}`
    })
}

let makeManualDate = () => {
    document.getElementById('years').style.display = 'none'
    document.getElementById('quarters').style.display = 'none'
    document.getElementById('months').style.display = 'none'
    document.getElementById('weeks').style.display = 'none'
    startDate.disabled = false
    endDate.disabled = false
    console.log('am I being run')
}
let accountForm=document.getElementById('accountForm');
let reportForm=document.getElementById('reportForm');
let formTitle=document.getElementById('formType');
let changeButton=document.getElementById('formToggle')
let accountFormIsShown=true;

changeButton.addEventListener('click',()=>{
    if(accountFormIsShown){
        formTitle.textContent='Report Form'
        changeButton.textContent='Show Account Form';
        accountFormIsShown=false;
    }else{
        formTitle.textContent='Account Form'
        accountFormIsShown=true;
        changeButton.textContent='Show Report Form';
    }
    reportForm.classList.toggle('hiddenForm')
    accountForm.classList.toggle('hiddenForm')
})
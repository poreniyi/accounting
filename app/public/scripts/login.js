let password=document.getElementById('pass');
let createNewUser=document.getElementById('newUser');
let forgotPasswordButton=document.getElementById('forgotPassword');

console.log(createNewUser);
console.log(password);

createNewUser.addEventListener('click',()=>{
    window.location.href="newUser.html";
});

forgotPasswordButton.addEventListener('click',()=>{
    window.location.href="forgotPassword.html";
});
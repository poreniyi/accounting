let password=document.getElementById('password');
let username=document.getElementById('username');
let createNewUser=document.getElementById('newUser');
let forgotPasswordButton=document.getElementById('forgotPassword');
let form=document.getElementById('form')
let data={
    password:password.value,
    username:username.value,
}


// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange=() => {
//     if 
// }
// form.addEventListener('click',(e)=>{
//     e.preventDefault();
//     fetch('/login'),{
//         method:'Post',
//         body:JSON.stringify(data),
//         credentials:'include',
//     }
// })

console.log(createNewUser);
console.log(password);

createNewUser.addEventListener('click',()=>{
    window.location.href="/newUser";
});

forgotPasswordButton.addEventListener('click',()=>{
    window.location.href="/forgotPassword";
});
let userPass=document.getElementById('pass');
let regexChecker=document.getElementById('regexChecker');

userPass.addEventListener("change", ()=>{
    let regexCheckerValue=regexFunction(userPass.value);
    if(regexCheckerValue){
        regexChecker.textContent="";
    }else{
        regexChecker.textContent="Invalid password";
    }
})

let regexFunction=(string)=>{
    let pattern=/[A-Z]\w+\d+[^a-zA-Z0-9]+\w{4,}/;
    let isPassed=pattern.test(string);
    console.log(string);
    return isPassed;
}

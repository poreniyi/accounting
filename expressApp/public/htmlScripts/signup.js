let userPass=document.getElementById('pass');
let regexChecker=document.getElementById('regexChecker');

userPass.addEventListener("change", ()=>{
    let regexCheckerValue=regexFunction(userPass.value);
    if(regexCheckerValue.isPassed){
        regexChecker.textContent="";
    }else{
        regexChecker.textContent=regexCheckerValue.message;
        regexChecker.style.whiteSpace='pre-wrap';
        regexChecker.style.color='red';
    }
})

let regexFunction=(string)=>{
    let pattern=/[A-Z]\w+\d+[^a-zA-Z0-9]+\w{4,}/;
    let containsNumber=/\d/g.test(string);
    let containsSpecialCharacter=/[^a-zA-Z0-9]/.test(string);
    let startsWithCapital=/^[A-Z]/.test(string);
    let isCorrectLength=string.length>=8;
    let isPassed=false;
    let message=''; 

    if(containsNumber&&containsSpecialCharacter&&startsWithCapital&&isCorrectLength){
        isPassed= true;
        return;
    }
    let newline="\r\n";
    message+= containsNumber ? '': 'No number at least 1 number is required'+newline;
    message+= containsSpecialCharacter ? '': 'Please add a special character'+newline;
    message+= startsWithCapital ? '': 'Password needs to start with a capital'+newline;
    message+= isCorrectLength ? '': 'Too short please add more characters'+newline;

    console.log(message);
    return{
        message:message,
        isPassed:isPassed,
    };
}

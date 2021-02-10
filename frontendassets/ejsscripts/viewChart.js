let viewButton=document.getElementById('viewButton');
editButton.addEventListener('click',async() => {
    let request= await fetch('./getChart');
    let json= await request.json();
    console.log(json);
})
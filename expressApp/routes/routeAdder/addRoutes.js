const fs=require ('fs');
let path=require('path');
const directory=path.join(__dirname,"../");
//this grabs all the routes from the routes directory and dynamically adds them as routes using the path and router properties
let addRoutes=(app)=>{
    console.log('Now adding routes ');
    let fileList=fs.readdirSync(directory);
    let jsFiles=fileList.filter(individual=>individual.endsWith('js'));
        console.log(jsFiles.length);
        for(let i=0;i<jsFiles.length;i++){
            console.log(`Now adding ${jsFiles[i].slice(0,-3)} route`);
            let newRoute= require('../'+jsFiles[i]);
            app.use(newRoute.path,newRoute.router);
            console.log(newRoute.path);
        }
        console.log('Finished adding routes. '+jsFiles.length+' were added');
}

module.exports={
    addRoutes:addRoutes,
}
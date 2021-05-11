// Hello. I create example data.

const { Promise } = require('sequelize');



//make database if its not already alive
require(__dirname+'/database_creator.js');      //creats global.db
require(__dirname+"/../Models/index.js") // Create models (& thus tables)

const Student= require(__dirname+'/../models/Student.js');//fetch the Model definition

global.db.sync();                     // Persist to database first time. Call this often.


function aFew(){
    return 4+Math.random()*3;
}
function randomName(){
    var vowels       = 'iouea';
    var consonates       = 'bcdfghjklmnprstvwyaaddhhmmgghghdc';
    var builtName ="";
    
    builtName+=randomChar(consonates.toUpperCase());
    var len=1+Math.random()*2;
    for (var i=0; i<len;i++){ 
        builtName+=randomChar(vowels);
        if (Math.random() > 0.8) builtName+=randomChar(vowels);
        builtName+=randomChar(consonates);
    }
    if (Math.random() < 0.5) builtName+=randomChar(vowels);
    return builtName;
}
function randomChar(str){
    return str.charAt(Math.floor(Math.random()*str.length ));
}

function destroyStudents(){
    global.db.students.drop();
    
}
async function makeStudent(){

    
    jane = await Student.create({ firstName: randomName(), lastName: randomName() });
    global.db.sync();                     // Persist to database first time. Call this often.

    console.log("Created Student "+ jane.firstName + " " + jane.lastName);
    //console.log("made:"+jane.firstName);

}

for (var i=0;i<aFew();i++){
    makeStudent();        
}
global.db.sync();
//destroyStudents();
console.log(randomName());
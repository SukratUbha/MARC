// Hello. I create example data.

//make database if its not already alive
require(__dirname+'/database_creator.js');      //creats global.db
require(__dirname+"/../Models/index.js") // Create models (& thus tables)

function makeStudent(){
    const Student= require(__dirname+'/../models/Student.js');//fetch the Model definition

    const jane = Student.create({ firstName: randomName(), lastName: randomName() });
    console.log("Created Student ", jane.firstName + " " + jane.lastName);
   

}
function aFew(){
    return 4+Math.random()*3;
}
function randomName(){
    var vowels       = 'iouea';
    var consonates       = 'abcdfghjklmnprstvwy';
    var builtName ="";
    
    builtName+=randomChar(consonates.toUpperCase());
    var len=1+Math.random()*3;
    for (var i=0; i<len;i++){ 
        builtName+=randomChar(vowels);
        builtName+=randomChar(consonates);
    }
    builtName+=randomChar(vowels);
    return builtName;
}
function randomChar(str){
    return str.charAt(Math.floor(Math.random()*str.length ));
}

for (var i=0;i<aFew();i++){
    makeStudent();        
}

console.log(randomName());
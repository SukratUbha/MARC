
global.db.users = require("./User.js");
global.db.courses = require("./Course.js");  //IMPORTANT: ALWAYS supply an argument here, even tho global.db is global. If you dont supply an argument, Sequelize WILL NOT CREATE THE OBJECT. This took me 7 HOURS OF TORTURE to figure out. please, dont suffer the same fate as i. i have aged and my kids have grown up. i dont recognize the world anymore. please, dont omit an argument in this.
global.db.students = require("./Student.js");  //this and User are the new model type (class defined)
global.db.association = require("./Association.js");

//don't show the log when it is in "test" environment
const config = require('config');
if(config.util.getEnv('NODE_ENV') == 'test') {
    sequelize.options.logging = false
}

// global.db.sync({ force: true }); // This creates the table, dropping it first if it already existed (might need to remove)
module.exports=db;        //Controllers look for db, then classes off that.



global.db.users=require("./User.js");
global.db.courses=require("./Course.js")(global.db);  //IMPORTANT: ALWAYS supply an argument here, even tho global.db is global. If you dont supply an argument, Sequelize WILL NOT CREATE THE OBJECT. This took me 7 HOURS OF TORTURE to figure out. please, dont suffer the same fate as i. i have aged and my kids have grown up. i dont recognize the world anymore. please, dont omit an argument in this.
module.exports=db;        //Controllers look for db, then classes off that.


const Sequelize= require("sequelize");


console.log("inside models/index.js");
//DATABASE: Initialize global singleton Sequelize if not already

if (typeof global.db === 'undefined' || global.db === null) {
  global.db = new Sequelize({       
  dialect: "sqlite",
  storage: __dirname+"/marcdatabase.sqlite"
  
  });
  console.log("inside models/index.js. global.db created");
} 

global.db.courses=require("./Course.model.js")(global.db); 
module.exports=db;


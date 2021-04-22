Sequelize=require("sequelize");
// This gets called to create the database.
// This code is in an external database so unit tests can call it, and create the database.

// The database is a GLOBAL variable. Tho Sequelize still require
// a Sequalize object to be passed around here & there (see models/index.js)
//
// Initialize global singleton Sequelize if not already
if (typeof global.db === 'undefined' || global.db === null) {
  global.db = new Sequelize({       
  dialect: "sqlite",
  storage: __dirname+"/../marcdatabase.sqlite"
  
  });
  console.log("global.db created");
} 

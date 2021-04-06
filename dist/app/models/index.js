const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");     //Squelize (caps) is a class.
var pathResolver = require('path')
//squelize (lowercase) is an instance of a Squelize object.
//Build it and configure it to use our backend file.

var dbPath = pathResolver.join(__dirname,"../persistence/marcdatabase.sqlite")
console.log("sqlite database path is" + dbPath);
const sequelize = new Sequelize({       
  dialect: "sqlite",
  storage: dbPath
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.courses = require("./Course.model.js")(sequelize, Sequelize); 

module.exports = db;
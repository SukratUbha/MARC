const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");     //Squelize (caps) is a class.

//squelize (lowercase) is an instance of a Squelize object.
//Build it and configure it to use our backend file.
const sequelize = new Sequelize({       
  dialect: "sqlite",
  storage: "./dist/app/database/marcdatabase.sqlite"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize); 

module.exports = db;
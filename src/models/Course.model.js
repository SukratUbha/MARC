// Sequelize Model represents tutorials table in SQLite database.

module.exports = () => {
  const { Sequelize, DataTypes } = require('sequelize');
  sequelize=global.db;
    const Course = sequelize.define("course", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
    console.log("inside course.model.js. Course is:" +Course);
    return Course;
  };

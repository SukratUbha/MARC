// Sequelize Model represents tutorials table in SQLite database.

module.exports = (sequelize) => {
  const { Sequelize, DataTypes } = require('sequelize');
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
  
    return Course;
  };

  function constructor(){


  }
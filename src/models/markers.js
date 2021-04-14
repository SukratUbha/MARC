// Sequelize Model represents tutorials table in SQLite database.

module.exports = () => {
    const { Sequelize, DataTypes } = require('sequelize');
    sequelize = global.db;
      return sequelize.define("Marker", {
        firstName: {
          type: DataTypes.STRING,
          validate: {
              notEmpty: true
          }
        }, 
        lastName: {
          type: DataTypes.STRING
        },
        firstPref: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        secondPref: {
            type: DataTypes.STRING
        },
        thirdPref: {
            type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            notEmpty: true
        }
        },
        pdfLocation: {
            type: DataTypes.STRING
        }
      });
      
    };
  
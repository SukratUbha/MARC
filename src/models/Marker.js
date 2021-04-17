// Sequelize Model adds a table of markers with email and their preferences to the db.

module.exports = () => {
    const {Sequelize, DataTypes } = require('sequelize');
    sequelize = global.db;
    const Marker = sequelize.define("Marker", {
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
      Marker.sync();
      return Marker;
    };
  
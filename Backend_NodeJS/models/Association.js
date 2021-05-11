const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Association extends Model {}

Association.init({
  // Model attributes are defined here
  course_id: { //course 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  student_id: { //student 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  request: { // requested by course coordinator
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  application: { // applied to mark course
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  slist: { // shit list
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  marking: { // currently marking the course
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  time: { // time allocated for the course
    type: DataTypes.INTEGER,
    allowNull: true
  }

}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Association' // We need to choose the model name
});


// the defined model is the class itself
console.log(Association === sequelize.models.Association); // true

// so we can access this from server.js and elsewhere
module.exports = Association
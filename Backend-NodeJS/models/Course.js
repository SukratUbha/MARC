const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Course extends Model {}

Course.init({
  // Model attributes are defined here
  Course_name: { // course name 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  CC: { //course coordinator name
    type: DataTypes.STRING,
    allowNull: false
  },
  CC_email: { // course coordinator's email
    type: DataTypes.STRING,
    allowNull: false
  },
  Total_student: { // estimate students in the course
    type: DataTypes.INTEGER
  },
  comment: { // course coordinator's comment
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Course', // We need to choose the model name
  timestamps: false,
  createdAt: false,
  updatedAt: false
});

// the defined model is the class itself
console.log(Course === sequelize.models.Course); // true
function boss(params) {
  
} 
// so we can access this from server.js and elsewhere
module.exports = Course
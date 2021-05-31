const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Course extends Model {}

Course.init({
  // Model attributes are defined here
  Course_name: { // course name 
    type: DataTypes.INTEGER,
  },
  CC: { //course coordinator name
    type: DataTypes.STRING,
  },
  CC_email: { // course coordinator's email
    type: DataTypes.STRING,
  },
  //  REMOVED because no authentication atm
  // Owner: { //Foreign key User model (id)
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  Year: { // 1st year course/2nd year etc.
    type: DataTypes.INTEGER,
  },
  Deadline: { // Enrolment Deadline
    type: DataTypes.DATE
  },
  Hours: { // Hours to make one student
    type: DataTypes.DECIMAL,
  },
  Total_student: { // estimate students in the course
    type: DataTypes.INTEGER
  },
  Total_hours: { // total hours marking required for course (overridable) 
    type: DataTypes.INTEGER
  },
  comment_CC: { // course coordinator's comment
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  comment_MC: { // marker coordinator's comment
    type: DataTypes.STRING
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
    const Cs101 = Course.create({Course_name:"CS101", CC:"Damir", CC_email:"damir@gmail.com", Total_student:null, comment:null});

} 
// so we can access this from server.js and elsewhere
module.exports = Course
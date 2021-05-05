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
  Year: { // 1st year course/2nd year etc.
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Deadline: { // Enrolment Deadline
    type: DataTypes.DATE,
    allowNull: false
  },
  Hours: { // Hours to make one student
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Total_student: { // estimate students in the course
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

//Course.sync({ force: true });
(async () => {
  const t = await sequelize.transaction();
  await sequelize.sync({ force: true });

  await Course.create({ Course_name:"CS373", 
  CC:"Bukhard", 
  CC_email:"bukhard@gmail.com", 
  Deadline: '2021-10-28', 
  Year: 3, 
  Hours: 2,
  Total_student:123, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await Course.create({ Course_name:"CS101", 
  CC:"Damir", 
  CC_email:"damir@gmail.com", 
  Deadline: '2021-08-09', 
  Year: 1, 
  Hours: 1.4,
  Total_student:500, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await Course.create({ Course_name:"CS120", 
  CC:"Tanya", 
  CC_email:"tanya@gmail.com", 
  Deadline: '2021-09-09', 
  Year: 1, 
  Hours: 1.6,
  Total_student:300, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await Course.create({ Course_name:"CS316", 
  CC:"Rizwan", 
  CC_email:"rizwan@gmail.com", 
  Deadline: '2021-9-20', 
  Year: 3, 
  Hours: 2,
  Total_student:150, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await Course.create({ Course_name:"CS210", 
  CC:"Bruce", 
  CC_email:"bruce@gmail.com", 
  Deadline: '2021-8-20', 
  Year: 2, 
  Hours: 2.5,
  Total_student:300, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await Course.create({ Course_name:"CS340", 
  CC:"Robert", 
  CC_email:"robert@gmail.com", 
  Deadline: '2021-8-20', 
  Year: 3, 
  Hours: 2.6,
  Total_student:113, 
  comment_CC:null,
  comment_MC:null},{transaction:t});

  await t.commit();

})().then(()=>{sequelize.close()})
.catch(error =>{console.log(error)})


                
// the defined model is the class itself
console.log(Course === sequelize.models.Course); // true
function boss(params) {
    const Cs101 = Course.create({Course_name:"CS101", CC:"Damir", CC_email:"damir@gmail.com", Total_student:null, comment:null});

} 
// so we can access this from server.js and elsewhere
module.exports = Course
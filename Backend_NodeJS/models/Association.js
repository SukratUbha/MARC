const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Association extends Model {}

Association.init({

  //////////////////////
  //Two foreign keys. 
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  student_id: { 
    //this is NOT their 'student ID'. its a foreign key. the 'student ID' in real life is just a property on the student model. it has no functional purpose.
    type: DataTypes.INTEGER,
    allowNull: false
  },

  ///////////////////////
  // The fields that indicate a student's relationship to this course.
  // Because they're INTEGERs they can take on the form of: false, true, and true-with-a-value.

  burkhard_proposed: { 
    // proposted-hours that this student works on the course (by Marker coordinator)
    // -1 means true. 0 means false. a value specifies how many hours.
    type: DataTypes.INTEGER
  },

  course_proposed: {
    // proposted-hours that this student works on the course (by Course-Coordinator coordinator)
    // -1 means true. 0 means false. a value specifies how many hours.
    type: DataTypes.INTEGER
  },

  student_proposed: { 
    // student applied to mark course
    // -1 is true. 0 is false.
    type: DataTypes.INTEGER
  },

  course_blacklist: {
    // course coordinator blacklisted this student from this course.
    // -1 is true. 0 is false.
    type: DataTypes.INTEGER
  },

  burkhard_blacklist: {
    // marker coordinator blacklisted this student from this course.
    // -1 is true, 0 is false;
    type: DataTypes.INTEGER
  },
  
  marking_hours: {
    // student is officially marking the course for N hours.
    // -1 means true.
    // 0 means false
    // value means hours.
    type: DataTypes.INTEGER

  },
  
  previously_enrolled: {
    // student previously enrolled this course.
    // -1 means true.
    // 0 means false
    // value means ... maybe it can mean how many semesters ago? 
    // we could keep historical Association tables & this might be a foriegn key of sorts some time in the future. <-- Dave thinks ahead :)
    type: DataTypes.INTEGER

  },
  previously_marked: {
    // student previously enrolled this course.
    // -1 means true.
    // 0 means false
    // value means ... maybe it can mean how many semesters ago? 
    // we could keep historical Association tables & this might be a foriegn key of sorts some time in the future. <-- Dave thinks ahead :)
    type: DataTypes.INTEGER

  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Association', // We need to choose the model name
  timestamps: false,
  createdAt: false,
  updatedAt: false
});


// the defined model is the class itself
console.log(Association === sequelize.models.Association); // true

// so we can access this from server.js and elsewhere
module.exports = Association
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class User extends Model {}

User.init({
  // Model attributes are defined here
  username: { //their email address
    type: DataTypes.STRING,
    allowNull: false
  },

  password: { //hashed password
    type: DataTypes.STRING,
    allowNull: false
  },

  firstName: {
    type: DataTypes.STRING,
    allowNull: false
    
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },

  accessLevel: { //student, course-coordinator, or marker co-ordinator
    type: DataTypes.STRING,
    allowNull: false
  },

  
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true

// so we can access this from server.js and elsewhere
module.exports = User
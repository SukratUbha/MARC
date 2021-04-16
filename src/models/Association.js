const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = global.db;

class Association extends Model {}

Association.init({
  // Model attributes are defined here
  Marker_ID: { //marker's preference 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Student_pref: { //student's preference 
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  CC_request: { // requested by course coordinator
    type: DataTypes.BOOLEAN
    // allowNull defaults to true
  },
  MC_propose: { // proposed by marker coordinator
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Association' // We need to choose the model name
});


// the defined model is the class itself
console.log(Association === sequelize.models.Association); // true
function boss(params) {
  
} 
// so we can access this from server.js and elsewhere
module.exports = Association
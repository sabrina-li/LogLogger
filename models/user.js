module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    } 
  });

  User.associate = function(models) {
    User.hasMany(models.Stool, {
      onDelete: "cascade"
    });
  };

  return User;
  
}
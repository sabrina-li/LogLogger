module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: DataTypes.INT,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Stool, {
      onDelete: "cascade"
    });
  };

  return User;
  
};

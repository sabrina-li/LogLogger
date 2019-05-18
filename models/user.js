<<<<<<< HEAD
module.exports = function(sequelize, Sequelize) {
  var User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    } 
  });

  User.associate = function(models) {
    User.hasMany(models.Stool, {
      onDelete: "cascade"
    });
  };

  return User;
  
};
=======
module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Stool, {
            onDelete: "cascade"
        });
    };

    return User;
};
>>>>>>> f1b70bc638ff6b8969795a8bb01ca9b420d3c7e0

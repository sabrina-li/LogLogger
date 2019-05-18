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
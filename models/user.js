module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define("User", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
        User.hasMany(models.Water, {
            onDelete: "cascade"
        });
        User.hasMany(models.Food, {
            onDelete: "cascade"
        });
    };

    return User;
};
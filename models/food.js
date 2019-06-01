module.exports = function (sequelize, DataTypes) {
    const Food = sequelize.define("Food", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        time: DataTypes.DATE,
        comment: DataTypes.STRING
    });

    Food.associate = function (models) {
        Food.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Food;
};
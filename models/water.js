module.exports = function(sequelize, DataTypes) {
    const Water = sequelize.define("Water", {
        intake: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: DataTypes.DATE
    });

    Water.associate = function(models) {
        Water.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Water;
};
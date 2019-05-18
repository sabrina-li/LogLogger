module.exports = function(sequelize, DataTypes) {
    const Stool = sequelize.define("Stool", {
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: DataTypes.DATE,
        comment: DataTypes.STRING
    });

    Stool.associate = function(models) {
        Stool.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };


    return Stool;
    
};
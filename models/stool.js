module.exports = function(sequelize, Sequelize) {
    var Stool = sequelize.define("stools", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        time: Sequelize.DATETIME,
        comment: Sequelize.STRING
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


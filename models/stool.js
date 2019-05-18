module.exports = function(sequelize, Sequelize) {
    var Stool = sequelize.define("stools", {
        score: {
            type: Sequeiize.INTEGER,
            allowNull: false
        },
        time: Sequeiize.DATETIME,
        comment: Sequeiize.STRING
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


module.exports = function(sequilize, DataTypes) {
    var Stool = sequilize.define("Stool", {
        id: {
            type: Sequeilize.INTEGER,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        time: DataTypes.DATETIME,
        comment: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER
        }
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


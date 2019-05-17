module.exports = function(sequilize, DataTypes) {
    var Stool = sequilize.define("Stool", {
        id: DataTypes.INT,
        score: DataTypes.INT,
        time: DataTypes.DATETIME,
        comment: DataTypes.STRING,
        user_id: {
            type: DataTypes.INT
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


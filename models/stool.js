export default function(sequeilize, Sequeilize) {
    var Stool = sequeilize.define("stools", {
        score: {
            type: Sequeilize.INTEGER,
            allowNull: false
        },
        time: Sequeilize.DATETIME,
        comment: Sequeilize.STRING
    });

    Stool.associate = function(models) {
        Stool.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Stool;
    
}


module.exports = (sequelize, Sequelize) => {
    const TransactionSituation = sequelize.define('transactionSituation', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            unique: true
        }
    }, {
        underscored: true,
        createdAt: false,
        updatedAt: false,
    })

    TransactionSituation.associate = function (models) {
        TransactionSituation.hasMany(models.transaction)
    };

    return TransactionSituation
}

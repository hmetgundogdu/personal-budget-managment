module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false
        },
        amount: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        sign: {
            type: Sequelize.BOOLEAN(1),
        },
    }, { underscored: true })

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.user)
        Transaction.belongsTo(models.transactionCategory)
        Transaction.belongsTo(models.transactionSituation)
    }

    return Transaction
}

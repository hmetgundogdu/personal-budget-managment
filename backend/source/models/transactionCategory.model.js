module.exports = (sequelize, Sequelize) => {
    const TransactionCategory = sequelize.define('transactionCategory', {
        id: {
            type: Sequelize.INTEGER,
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

    TransactionCategory.associate = function (models) {
        TransactionCategory.hasMany(models.transaction)
    };

    return TransactionCategory
}

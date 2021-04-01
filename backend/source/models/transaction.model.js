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
        sign: {
            type: Sequelize.BOOLEAN(1),
        },
        isGenesis: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        note_id: {
            type: Sequelize.INTEGER,
            nullable: true
        }
    }, { underscored: true })

    Transaction.associate = function (models) {
        Transaction.hasOne(models.transactionNote, { foreignKey: "id" })
    }

    return Transaction
}

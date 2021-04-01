module.exports = (sequelize, Sequelize) => {
    const TransactionNote = sequelize.define('transactionNote', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note: {
            type: Sequelize.STRING,
        }
    }, { underscored: true })

    TransactionNote.associate = function () {

    };

    return TransactionNote
}

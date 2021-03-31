module.exports = (sequelize, Sequelize) => {
    const TransactionSchedule = sequelize.define('transactionSchedule', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        repetition: {
            type: Sequelize.INTEGER,
            nullable: true
        },
        times: {
            type: Sequelize.INTEGER,
            nullable: false,
        },
        endTime: {
            type: Sequelize.DATE,
            nullable: true,
        },
        lastCreationTime: {
            type: Sequelize.DATE,
            nullable: false,
        },
        nextCreationTime: {
            type: Sequelize.DATE,
            nullable: false,
        }
    }, {
        underscored: true,
        paranoid: true
    })

    TransactionSchedule.associate = function (models) {
        TransactionSchedule.belongsTo(models.transaction);
    };

    return TransactionSchedule
}

module.exports = (sequelize, Sequelize) => {
    const TransactionSchedule = sequelize.define('transactionSchedule', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        repetitionType: { // 1 = Day, 2 = Week...
            type: Sequelize.INTEGER(1),
            nullable: true
        },
        times: {
            type: Sequelize.INTEGER(1),
            nullable: true,
        },
        endTime: {
            type: Sequelize.DATE,
            nullable: true,
        },
        lastCreationTime: {
            type: Sequelize.DATE,
            nullable: false,
        },
        nextCreationTime: { // absolute time
            type: Sequelize.DATE,
            nullable: false,
        },
        // this is when we create transaction time, means thats equals nextCreationTime - (repetationType * 1) 
        transactionEntryTime: { 
            type: Sequelize.DATE,
            nullable: false,
        }
    }, {
        underscored: true,
        paranoid: true,
        timestamps: true,
    })

    TransactionSchedule.associate = function (models) {
        TransactionSchedule.belongsTo(models.transaction);
    };

    return TransactionSchedule
}

const { Op, col, fn } = require("sequelize");

const addTimeToDateByRepetitionTypeAndTimes = require("../modules/addTimeToDateByRepetitionTypeAndTimes")
module.exports = function (app, db) {

    app.get('/user/widgets/MonthlyCostByCategories', async (req, res) => {
        const { userId } = req.session;

        const today = new Date();
        // TODO: Move this query repos. or service 
        const transactions = await db.transaction.findAll({
            attributes: [
                'transaction_category_id',
                [fn('SUM', col('amount')), 'cost'],
            ],
            group: ['transaction_category_id'],
            where: {
                user_id: userId,
                start_date: {
                    [Op.between]: [
                        addTimeToDateByRepetitionTypeAndTimes(2, 15, today, true), // -15 day
                        addTimeToDateByRepetitionTypeAndTimes(2, 15, today) // + 15 day
                    ]
                },
                is_genesis: false,
                sign: true
            }
        });

        res.standartJson(true, transactions, null);
    });


    app.get('/user/widget/weeklyCostByDays', async (req, res) => {
        const { userId } = req.session;

        const today = new Date();
        const transactions = await db.transaction.findAll({
            attributes: [
                [fn('date_trunc', "day", col('start_date')), 'day'],
                [fn('SUM', col('amount')), 'cost'],
            ],
            group: ["day"],
            where: {
                user_id: userId,
                start_date: {
                    [Op.between]: [
                        addTimeToDateByRepetitionTypeAndTimes(2, 4, today, true), // 4 day
                        addTimeToDateByRepetitionTypeAndTimes(2, 5, today) // + 5 day
                    ]
                },
                is_genesis: false,
                sign: true
            }
        });

        res.standartJson(true, transactions, null);
    })


    app.get('/user/widget/summary', async (req, res) => {
        const { userId } = req.session;

        const today = new Date();
        const transactions = await db.transaction.findAll({
            where: {
                user_id: userId,
                start_date: {
                    [Op.between]: [
                        addTimeToDateByRepetitionTypeAndTimes(2, 4, today, true), // 4 day
                        addTimeToDateByRepetitionTypeAndTimes(2, 5, today) // + 5 day
                    ]
                },
                is_genesis: false,
            },
            limit: 10
        });

        res.standartJson(true, transactions, null);
    })

    app.get('/user/situations/', async (req, res) => {
        res.standartJson(true, await db.transactionSituation.findAll(), null);
    })

    app.get('/user/categories', async (req, res) => {
        res.standartJson(true, await db.transactionCategory.findAll(), null);
    })




}
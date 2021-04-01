module.exports = function (app, db) {
    // get schedules
    app.get('/user/widgets/MonthlyCostByCategories', async (req, res) => {

        const { userId } = req.session;
        // gets user schedules
        const transactions = await db.transaction.findAll({
            userId,
            group: ['transaction_category_id'],
            where: {
                
            }
        });

        res.standartJson(true, { transactions }, null);
    });

}
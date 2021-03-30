
// eslint-disable-next-line no-unused-vars
module.exports = function (app, db) {
    // get schedules
    app.get('/transaction', async (req, res) => {

        const { userId } = req.session;
        // gets user schedules
        const transactions = await db.transaction.findAll({ userId });

        res.standartJson(true, { transactions }, null);
    });

    // eslint-disable-next-line no-unused-vars
    app.delete('/schedule', async (req, res) => {
        // validate schedule data
        // update schedule
    })
}
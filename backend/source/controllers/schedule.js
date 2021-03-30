// eslint-disable-next-line no-unused-vars
module.exports = function (app, db) {
    // get schedules
    app.get('/schedule', async (req, res) => {

        const { userId } = req.session;
        // gets user schedules
        let data = await db.sequelize.query(`
            SELECT *
            FROM transaction_schedules as ts
            INNER JOIN transactions as t ON t.id = ts.transaction_id
            WHERE t.user_id = ${userId};
        `);

        res.standartJson(true, { schedule: data[0] }, null);
    });

    // eslint-disable-next-line no-unused-vars
    app.delete('/schedule', async (req, res) => {
        // TODO delete schedule and related genesis transaction 
    }) 
} 
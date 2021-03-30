/* eslint-disable no-unreachable */
const Token = require("../modules/jwt");
const crypto = require('crypto');

module.exports = function (app, db) {
    // eslint-disable-next-line no-unused-vars
    // login and generate a token
    app.post('/session', async (req, res) => {
        const SHA256 = crypto.createHash('sha256');
        const { username, password } = req.body;

        // check user' name and password is currect 
        const result = await db.user
            .findOne({
                where:
                {
                    username,
                    password: SHA256.update(password).digest('hex')
                }
            })

        if (result == null) {
            return res.standartJson(false,
                {},
                [
                    { title: "Login", message: "Username or password incorrect." }
                ]);
        }

        res.standartJson(true, { token: Token({ userId: result.id, username }) }, null);
    });
    // check token is valid
    app.post('/session/check', (req, res) => {
        res.json({ res })
    });
}
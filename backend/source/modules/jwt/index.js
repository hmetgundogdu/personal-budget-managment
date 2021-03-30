const jwt = require("jsonwebtoken");

function Token(payload) {
    return jwt.sign(payload, Token.privateKey, Token.options);
}

Token.privateKey = "RThi5nkfQL080O9EAEs2wuUgMsOaLxE0"
Token.options = { expiresIn: 1800 }

module.exports = Token
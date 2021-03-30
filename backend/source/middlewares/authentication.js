const jwt = require('jsonwebtoken')
const Token = require('../modules/jwt')

function authentication(req, res, next) {
  // disable on session route
  if (req.path.startsWith('/session'))
    return next()

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, Token.privateKey, (err, user) => {
    console.log("authorization", user)

    if (err) return res.sendStatus(403)

    req.session = user

    next()
  })
}

module.exports = authentication
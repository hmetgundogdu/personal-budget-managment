// standart of response
function standartResponse(req, res, next) {
    res.standartJson = function Response(success, payload, error) {
        return res.json({
            success,
            payload,
            error
        })
    }
    next()
}

module.exports = standartResponse;
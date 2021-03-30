// export whole controllers
module.exports = (app, db) => {
    return require('fs')
        .readdirSync(__dirname)
        .map((fileName) => {
            if (fileName != "index.js") {
                return require(__dirname + '/' + fileName)(app, db)
            }
        });
}
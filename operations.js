const mysql = require("mysql")

function insert(connection, operation, callback){
    let insertQuery = operation;
    connection.query(insertQuery, function(err, result){
        if(err) throw err;
        callback(result);
    })
}

module.exports = {insert};
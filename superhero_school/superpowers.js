module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get all superpower names and levels
    function getSuperpowers(res, mysql, context, complete) {
        mysql.pool.query("SELECT superpowerID, name, level FROM Superpowers ORDER BY name, level ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.superpowers = results;
            complete();
        });
    }

    // Display all superpowers
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getSuperpowers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 1) {
                res.render('superpowers', context);
            }
        }
    });

    // Adds a superpowers, redirects to the superpowers page after adding
    router.post('/', function(req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Superpowers (name, level) VALUES (?,?)";

        var inserts = [req.body.name, req.body.level];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/superpowers');
            }
        });
    });

    return router;
}(); 
module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Associate an employee with a team and then redirect to the team page after adding 
    router.post('/', function(req, res){
        console.log(req.body.team);
        console.log(req.body.employee);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Employees_Teams (teamID, employeeID) VALUES (?,?)";
        var inserts = [req.body.team, req.body.employee];

        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write("This employee is already in the team!");
                res.end();
            } else {
                res.redirect('/teams/filter/' + req.body.team);
            }
        });
    });

    // dis-associate a employee from a mission
    router.delete('/tid/:tid/eid/:eid', function(req, res) {
        console.log(req.params.tid);
        console.log(req.params.eid);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Employees_Teams WHERE teamID = ? AND employeeID = ?";
        var inserts = [req.params.tid, req.params.eid];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}(); 
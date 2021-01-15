module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get all team ids and names
    function getTeams(res, mysql, context, complete) {
        mysql.pool.query("SELECT teamID, name FROM Teams ORDER BY name ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teams = results;
            complete();
        });
    }

    // Get all employees
    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC", function(error, results, fields) {
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees = results;
            complete();
        });
    }
    // Get employees by teams
    function getEmployeesByTeam(req, res, mysql, context, id, complete) {
        var query = `SELECT t.teamID, e.employeeID, e.firstName, e.lastName FROM Teams t 
                    INNER JOIN Employees_Teams et on t.teamID = et.teamID
                    INNER JOIN Employees e on e.employeeID = et.employeeID
                    WHERE t.teamID = ?
                    ORDER BY e.firstName, e.lastName ASC`;
        var inserts = [id];
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.employees_filtered = results;
              complete();
        });
    }

    // Get a team's name
    function getTeamName(req, res, mysql, context, id, complete) {
        var query = 'SELECT name FROM Teams WHERE teamID = ?';
        var inserts = [id];

        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.teamName = results[0].name;
            console.log(context.teamName);
            complete();
        });
    }

    // Get a single team
    function getTeam(req, res, mysql, context, id, complete) {
        var query = 'SELECT * FROM Teams WHERE teamID = ?';
        var inserts = [id];

        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.team = results[0];
            complete();
        });
    }

    // Display all teams
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filter_employees.js", "delete_team.js", "delete_employee.js"];
        var mysql = req.app.get('mysql');
        getTeams(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 2) {
                res.render('teams', context);
            }
        }
    });

    // Adds a team, redirects to the teams page after adding
    router.post('/', function(req, res) {
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Teams (name, headquartersLocation, groupEmail) VALUES (?,?,?)";

        var inserts = [req.body.name, req.body.headquartersLocation, req.body.groupEmail];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/teams');
            }
        });
    });

    // Display all employees from a team
    router.get('/filter/:teamID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filter_employees.js", "delete_team.js", "delete_employee.js"];
        var mysql = req.app.get('mysql');
        getEmployeesByTeam(req, res, mysql, context, req.params.teamID, complete);
        getTeams(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        getTeamName(req, res, mysql, context, req.params.teamID, complete);

        function complete() {
            callbackCount++;
            if(callbackCount >= 4){
                res.render('teams', context);
            }

        }
    });

    // Delete a team
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Teams WHERE teamID = ?";
        var inserts = [req.params.id];
        console.log(req.params.id);
        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    });

    // Display a team and its members
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_employee.js"];
        var mysql = req.app.get('mysql');
        getTeam(req, res, mysql, context, req.params.id, complete);
        getEmployeesByTeam(req, res, mysql, context, req.params.id, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('show_team', context);
            }
        }
    });

    return router;
}(); 
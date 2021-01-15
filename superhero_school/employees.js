module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get all employees' ids and names
    function getEmployees(res, mysql, context, complete) {
        mysql.pool.query("SELECT employeeID, firstName, lastName FROM Employees ORDER BY firstName, lastName ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees = results;
            complete();
        });
    }

    // Get all superpowers
    function getSuperpowers(res, mysql, context, complete) {
        mysql.pool.query("SELECT superpowerID, CONCAT(name,' LEVEL ',level) AS superpower FROM Superpowers ORDER BY name, level ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.superpowers = results;
            complete();
        });
    }

    // Get an employee's information
    function getEmployee(res, mysql, context, id, complete) {
        var sql = "SELECT * FROM Employees WHERE employeeID = ?";
        var inserts = [id];

        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            context.employee = results[0];
            console.log(context.employee);
            complete();
        });
    }

    // Get teams by employee
    function getTeamsByEmployee(req, res, mysql, context, id, complete) {
        var query = `SELECT e.employeeID, t.teamID, t.name FROM Employees e
                    INNER JOIN Employees_Teams et on e.employeeID = et.employeeID
                    INNER JOIN Teams t on t.teamID = et.teamID
                    WHERE e.employeeID = ?
                    ORDER BY t.name ASC`;

        var inserts = [id];
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.teams_filtered = results;
              complete();
          });
    }

    // Display all employees
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ['delete_employee.js'];
        var mysql = req.app.get('mysql');
        getEmployees(res, mysql, context, complete);
        getSuperpowers(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 2) {
                res.render('employees', context);
            }
        }
    });

    // Adds an employee, redirects to the employees page after adding
    router.post('/', function(req, res) {
        console.log(req.body.superpower);
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Employees (firstName, lastName, alias, email, position, area, superpower, home) VALUES (?,?,?,?,?,?,?,?)";
        var lname = req.body.lname;
        var alias = req.body.alias;
        var superpower = req.body.superpower;

        if (lname === "") {
            lname = null;
        }

        if (alias === "") {
            alias = null;
        }

        if (superpower === "") {
            superpower = null;
        }

        var inserts = [req.body.fname, lname, alias, req.body.email, req.body.position, req.body.area, superpower, req.body.home];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/employees');
            }
        });
    });

    // Deletes an employee, redirects to the employees page after deletion
    router.delete('/:employeeID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Employees WHERE employeeID = ?";
        var inserts = [req.params.employeeID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })


    // Display an employee
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update_employee.js"];
        var mysql = req.app.get('mysql');

        getEmployee(res, mysql, context, req.params.id, complete);
        getSuperpowers(res, mysql, context, complete);
        getTeamsByEmployee(req, res, mysql, context, req.params.id, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 3) {
                res.render('show_employee', context);
            }
        }
    });

    // Updates an employee's information
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id);
        var sql = "UPDATE Employees SET firstName = ?, lastName = ?, alias = ?, email = ?, position = ?, area = ?, superpower = ?, home = ? WHERE employeeID = ?";

        var lname = req.body.lname;
        var alias = req.body.alias;
        var superpower = req.body.superpower;
        var home = req.body.home;

        if (lname === "") {
            lname = null;
        }

        if (alias === "") {
            alias = null;
        }

        if (superpower === "") {
            superpower = null;
        }

        if (home === "") {
            home = null;
        }

        var inserts = [req.body.fname, lname, alias, req.body.email, req.body.position, req.body.area, superpower, home, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();    
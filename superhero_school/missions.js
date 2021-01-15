module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Get all missions ids and names
    function getMissions(res, mysql, context, complete) {
        mysql.pool.query("SELECT missionID, name FROM Missions ORDER BY name ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.missions = results;
            complete();
        });
    }

    // Get all leaders
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

    // Get all students' ids and names
    function getStudents(res, mysql, context, complete) {
        mysql.pool.query("SELECT studentID, firstName, lastName FROM Students ORDER BY firstName, lastName ASC", function(error, results, fields){
            if(error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.students = results;
            complete();
        });
    }

    // Get students by mission
    function getStudentsByMission(req, res, mysql, context, id, complete) {
        var query = `SELECT m.missionID, s.studentID, s.firstName, s.lastName FROM Missions m 
                    INNER JOIN Students_Missions sm on m.missionID = sm.missionID
                    INNER JOIN Students s on s.studentID = sm.studentID
                    WHERE m.missionID = ?
                    ORDER BY s.firstName, s.lastName ASC`;
        var inserts = [id];
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.students_filtered = results;
              complete();
          });
    }

    // Get a mission's name
    function getMissionName(req, res, mysql, context, id, complete) {
        var query = 'SELECT name FROM Missions WHERE missionID = ?';
        var inserts = [id];

        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.missionName = results[0].name;
            console.log(context.missionName);
            complete();
        });
    }

    // Get a single mission
    function getMission(req, res, mysql, context, id, complete) {
        var query = `SELECT m.missionID, m.name, e.firstName AS leaderFName, e.lastName AS leaderLName FROM Missions m 
                    INNER JOIN Employees e on m.leader = e.employeeID
                    WHERE m.missionID = ?`;
        var inserts = [id];

        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.mission = results[0];
            complete();
        });
    }

    // Display all missions
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filter_students.js", "delete_student.js", "delete_mission.js"];
        var mysql = req.app.get('mysql');
        getMissions(res, mysql, context, complete);
        getStudents(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 3) {
                res.render('missions', context);
            }
        }
    });

    // Adds a mission, redirects to the missions page after adding
    router.post('/', function(req, res) {
        console.log(req.body.leader);
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Missions (name, leader) VALUES (?,?)";

        var inserts = [req.body.name, req.body.leader];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/missions');
            }
        });
    });

    // Display all students from a given mission on missions page
    router.get('/filter/:missionID', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["filter_students.js", "delete_student.js", "delete_mission.js"];
        var mysql = req.app.get('mysql');
        getStudentsByMission(req, res, mysql, context, req.params.missionID, complete);
        getMissions(res, mysql, context, complete);
        getStudents(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        getMissionName(req, res, mysql, context, req.params.missionID, complete);

        function complete() {
            callbackCount++;
            if(callbackCount >= 5){
                res.render('missions', context);
            }

        }
    });

    // Display a mission and its student list
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["delete_student.js"];
        var mysql = req.app.get('mysql');
        getMission(req, res, mysql, context, req.params.id, complete);
        getStudentsByMission(req, res, mysql, context, req.params.id, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('show_mission', context);
            }
        }
    });

    // Delete a mission
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Missions WHERE missionID = ?";
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

    return router;
}(); 
module.exports = function() {
    var express = require('express');
    var router = express.Router();

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

    // Get all mentors
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

    // Get a student
    function getStudent(res, mysql, context, id, complete) {
        var sql = "SELECT studentID, firstName, lastName, alias, email, GPA, superpower, mentor FROM Students WHERE studentID = ?";
        var inserts = [id];

        mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            context.student = results[0];
            console.log(context.student);
            complete();
        });
    }

    // Get missions by student
    function getMissionsByStudent(req, res, mysql, context, id, complete) {
        var query = `SELECT s.studentID, m.missionID, m.name FROM Students s
                    INNER JOIN Students_Missions sm on s.studentID = sm.studentID
                    INNER JOIN Missions m on m.missionID = sm.missionID
                    WHERE s.studentID = ?
                    ORDER BY m.name ASC`;
        var inserts = [id];
        mysql.pool.query(query, inserts, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.missions_filtered = results;
              complete();
          });
    }

    // Display all students
    router.get('/', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ['delete_student.js'];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, complete);
        getSuperpowers(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if(callbackCount >= 3) {
                res.render('students', context);
            }
        }
    });

    // Adds a student, redirects to the students page after adding
    router.post('/', function(req, res) {
        console.log(req.body.superpower);
        console.log(req.body.mentor);
        console.log(req.body);
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students (firstName, lastName, alias, email, GPA, superpower, mentor) VALUES (?,?,?,?,?,?,?)";
        var lname = req.body.lname;
        var alias = req.body.alias;
        var superpower = req.body.superpower;
        var mentor = req.body.mentor;

        if (lname === "") {
            lname = null;
        }

        if (alias === "") {
            alias = null;
        }

        if (superpower === "") {
            superpower = null;
        }

        if (mentor === "") {
            mentor = null;
        }

        var inserts = [req.body.fname, lname, alias, req.body.email, req.body.gpa, superpower, mentor];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/students');
            }
        });
    });

    // Display one student
    router.get('/:id', function(req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["update_student.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.id, complete);
        getSuperpowers(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        getMissionsByStudent(req, res, mysql, context, req.params.id, complete);

        function complete() {
            callbackCount++;
            if (callbackCount >= 4) {
                res.render('show_student', context);
            }
        }
    });

    // Update a student
    router.put('/:id', function(req, res) {
        var mysql = req.app.get('mysql');
        console.log(req.body);
        console.log(req.params.id);
        var sql = "UPDATE Students SET firstName = ?, lastName= ?, alias = ?, email = ?, GPA = ?, superpower = ?, mentor = ? WHERE studentID = ?";

        var lname = req.body.lname;
        var alias = req.body.alias;
        var superpower = req.body.superpower;
        var mentor = req.body.mentor;

        if (lname === "") {
            lname = null;
        }

        if (alias === "") {
            alias = null;
        }

        if (superpower === "") {
            superpower = null;
        }

        if (mentor === "") {
            mentor = null;
        }

        var inserts = [req.body.fname, lname, alias, req.body.email, req.body.gpa, superpower, mentor, req.params.id];

        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(error);
                res.write(JSON.stringify(error));
                res.end();
            } else {
                // res.redirect('/students/' + req.params.id);
                res.status(200);
                res.end();
            }
        });
    });

    // Delete a student
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Students WHERE studentID = ?";
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
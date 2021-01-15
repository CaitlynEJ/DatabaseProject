module.exports = function() {
    var express = require('express');
    var router = express.Router();

    // Associate a student with a mission and then redirect to the missions page after adding 
    router.post('/', function(req, res){
        console.log(req.body.mission);
        console.log(req.body.student);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO Students_Missions (missionID, studentID) VALUES (?,?)";
        var inserts = [req.body.mission, req.body.student];

        sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error));
                res.write("This student has already participated in the mission!");
                res.end();
            } else {
                res.redirect('/missions/filter/' + req.body.mission);
            }
        });
    });

    // dis-associate a student from a mission
    router.delete('/mid/:mid/sid/:sid', function(req, res) {
        console.log(req.params.mid);
        console.log(req.params.sid);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Students_Missions WHERE missionID = ? AND studentID = ?";
        var inserts = [req.params.mid, req.params.sid];
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
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var CORS = require('cors');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/students', require('./students.js'));
app.use('/missions', require('./missions.js'));
app.use('/students_missions', require('./students_missions.js'));

app.use('/employees', require('./employees.js'));
app.use('/superpowers', require('./superpowers.js'));
app.use('/teams', require('./teams.js'));
app.use('/employees_teams', require('./employees_teams.js'));

app.use('/', express.static('public'));
app.use(CORS());

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
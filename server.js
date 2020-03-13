var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection;

if (process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
 connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "MeStuff!77",
  database: "burgers_db"
 })
}

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get('/', function (req, res) {
  connection.query('SELECT * FROM burgers', (err, results) => {
    if (err) {
      res.sendStatus(500)
      console.log(err)
      return
    }
    console.table(results)
    res.render('index', { burgers: results })
  })
})
app.post("/api/burger", function (req, res) {
 console.log(req.body, '<=====')

  connection.query("INSERT INTO  burgers (burger_name) VALUES (?)", [req.body.burger_name], function (err, result) {
    if (err) {
      res.sendStatus(500);
      console.log(err);
      return;
    }
    res.sendStatus('200')
    console.log({ id: result.insertId });

  });
});

app.put('/api/burger/:id', function (req, res) {
  console.log('route hit')
  const id = req.params.id
  connection.query('UPDATE burgers SET devoured = ? WHERE id = ?', [1, id], (err, results) => {
    if (err) {
      res.sendStatus(500)
      console.log(err)
      return
    }
    res.sendStatus(200)
  })
})
// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

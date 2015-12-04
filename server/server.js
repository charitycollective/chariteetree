var express = require('express');
var app = express();
var port = 8000;

app.use(express.static(__dirname + '/../' + 'client'));

app.get('/', function(req, res){
  res.send('index.html')
});

app.listen(port);
console.log("listening on " + port)

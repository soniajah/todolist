var http = require('http')
var express = require('express')
var hostname = 'Localhost'
var port = 3000
const bodyParser = require('body-parser')
const controllers = require('./controllers.js')
const views = require('./views.js')
const models = require('./models.js')


var app = express()

app.get('/', controllers.home)
// app.get('/listoftasks', controllers.listoftasks)
app.get('/addtask', controllers.addtask)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.post('/savetask', controllers.savetask)
app.get('/editTask', controllers.editTask)
app.post('/saveChanges', controllers.saveChanges)
app.post('/deleteTask', controllers.deleteTask)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
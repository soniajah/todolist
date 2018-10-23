const controllers = require('./controllers.js')
const views = require('./views.js')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://localhost:27017/todolist'
// var list_of_tasks = [
//     {id: 1, name: 'task1', deadline: '2018-11-15', progress: '0.05'},
//     {id: 2, name: 'task2', deadline: '2018-12-10', progress: '0'},
//     {id: 3, name: 'task3', deadline: '2018-10-29', progress: '0.80'}
// ]

var dbClient
exports.dbConnect = MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
    if (err) throw err
    dbClient = client
});

exports.tasks = function (callback) {
    var db = dbClient.db('todolist')
    db.collection('tasks').find().toArray(function (err, result) {
        if (err) throw err
        // list_of_tasks = result 
        callback(result)
    })
}

exports.saveTask = function (myobj, callback) {
    var db = dbClient.db('todolist')
    db.collection('tasks').insertOne(myobj, function (err, res) {
        if (err) throw err
        console.log('1 task inserted')
        console.log(res)
    })
    db.collection('tasks').find().toArray(function (err, result) {
        if (err) throw err
        callback(result)
    })
}

exports.searchTaskbyid = function (id, callback) {
    var db = dbClient.db('todolist')
    var myquery = { _id: new mongodb.ObjectID(id) }
    db.collection('tasks').find(myquery).toArray(function (err, result) {
        if (err) throw err
        callback(result[0])
    })
}

exports.saveChanges = function (myobj, callback) {
    var db = dbClient.db('todolist')
    var myquery = { _id: new mongodb.ObjectID(myobj._id) }
    var newvalues = {
        $set: {
            _id: new mongodb.ObjectID(myobj._id),
            name: myobj.name,
            deadline: myobj.deadline,
            progress: myobj.progress
        }
    }
    console.log(myobj)
    db.collection('tasks').updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err
        callback(res)
        console.log('1 task updated')
        console.log(res)
    })
}

exports.deleteTask = function (id) {
    var db = dbClient.db('todolist')
    var myquery = { _id: new mongodb.ObjectID(id) }
    db.collection('tasks').deleteOne(myquery, function (err, obj) {
        if (err) throw err
        db.collection('tasks').find(myquery).toArray(function (err, result) {
            if (err) throw err
            console.log('1 task deleted')
            console.log(result)
        })
    })
}
const models = require('./models.js')
const views = require('./views.js')

exports.home = function (req, res) {
    models.tasks(function (allTasks) {
        res.send(views.objectToList(allTasks))
    })
}

exports.addtask = function (req, res) {
    var form = views.addtaskForm()
    res.send(form)
}

exports.savetask = function (req, res) {
    var newRecord = {
        name: req.body.name,
        deadline: req.body.deadline,
        progress: req.body.progress
    }
    models.saveTask(newRecord, function (allTasks) {
        res.redirect('/')
    })
}

exports.editTask = function (req, res) {
    models.searchTaskbyid(req.query._id, function (objInfo) {        
        var form = views.edittaskForm(objInfo)        
        res.send(form)
    })
}

exports.saveChanges = function (req, res) {
    var objInfoEdited = {
        _id: req.body._id,
        name: req.body.name,
        deadline: req.body.deadline,
        progress: req.body.progress
    }
    models.saveChanges(objInfoEdited, function (objInfoEdited) {
        res.redirect('/')
    })
}

exports.deleteTask = function (req, res) {
    models.deleteTask(req.body._id)
    res.redirect('/')
}

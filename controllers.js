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
        // views.edittaskForm(objInfo, function(){
        //     res.send(form)
        // })
        var form = views.edittaskForm(objInfo)
        // var form = "<form action='/saveChanges' method='post'>" +
        // "<input type='hidden' name='_id' value='"+req.query._id+"'>"+
        // "Task <input  type='text' name='name' value = '"+ objInfo.name +"' > <br><br>" +
        // "Deadline <input  type='date' name='deadline' value = '"+ objInfo.deadline +"'> <br><br>" +
        // "Progress Percentage <input  type='decimal' name='progress' value = '"+ objInfo.progress +"' > <br><br>" +
        // "<input type='submit' value='Save'/>" +
        // "<button onclick=\"location.href = '/';return false;\">Cancel</button></form>"
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

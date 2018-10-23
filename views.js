const controllers = require('./controllers.js')
const models = require('./models.js')
const moment = require('moment')

exports.objectToList = function (list_of_tasks) {
    var addbutton = "<h1> To do List </h1>" +
        "<form action='/addtask' method='get'>" +
        "<input type='submit' value='Add Task'/> </form>" +
        "<h2>List of Tasks</h2>"
    var data = addbutton + '<ul>'
    for (i = 0; i < list_of_tasks.length; i++) {
        let task = list_of_tasks[i]
        let wrapped = moment(task.deadline)
        task.progress = task.progress || 0
        data += '<li>' +
            '<table>' +
            task.name + ' ' +
            "<form action='/editTask' method='get'>" +
            "<input  type='hidden' name='_id' value='" + task._id + "'>" +
            "<input type='submit' value='Edit'/></form> " +

            "<form action='/deleteTask' method='post'>" +
            "<input  type='hidden' name='_id' value='" + task._id + "'>" +
            "<input type='submit' value='Delete'/> </form>" +
            '</table>' +

            '<b> Due Date: </b>' + wrapped.format("DD MMM YYYY") + '<br><br> ' +
            '<b> Progress: </b>' + task.progress * 100 + '%' + '<br><br> ' +
            '</li>'

    }
    data += '</ul>'
    return data
}

exports.addtaskForm = function () {
    var form = "<form action='/savetask' method='post'>" +
        "Task <input  type='text' name='name' > <br><br>" +
        "Deadline <input  type='date' name='deadline' > <br><br>" +
        "Progress Percentage <input  type='decimal' name='progress' > <br><br>" +
        "<input type='submit' value='Add'/>" +
        "<button onclick=\"location.href = '/';return false;\">Cancel</button></form>"
    return form
}

exports.edittaskForm = function (objInfo) {
    var form = "<form action='/saveChanges' method='post'>" +
        "<input type='hidden' name='_id' value='" + objInfo._id + "'>" +
        "Task <input  type='text' name='name' value = '" + objInfo.name + "' > <br><br>" +
        "Deadline <input  type='date' name='deadline' value = '" + objInfo.deadline + "'> <br><br>" +
        "Progress Percentage <input  type='decimal' name='progress' value = '" + objInfo.progress + "' > <br><br>" +
        "<input type='submit' value='Save'/>" +
        "<button onclick=\"location.href = '/';return false;\">Cancel</button></form>"
    return form
}
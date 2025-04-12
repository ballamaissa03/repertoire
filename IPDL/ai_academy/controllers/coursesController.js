const httpStatus = require('http-status-codes');
const contentTypes = require('../contentTypes');
const utils = require('../utils');
const courses = require('../models/courses');
module.exports = {
getCourses: (req, res) => {
utils.getFile("views/courses.html", res);
},
getCoursesAPI: (req, res) => {
res.writeHead(httpStatus.OK, contentTypes.json);
res.end(JSON.stringify(courses));
},
getCourseById: (req, res, id) => {
const course = courses.find(c => c.id === parseInt(id));
if (course) {
res.writeHead(httpStatus.OK, contentTypes.json);
res.end(JSON.stringify(course));
} else {
res.writeHead(httpStatus.NOT_FOUND, contentTypes.json);
res.end(JSON.stringify({ error: "Cours non trouvé" }));
}
}
};

const NodeCouchDb = require('node-couchdb');
const fs = require('fs');


const couchAuth = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'admin'
    }
});

fs.readFile('./students.json', 'utf-8', (err, data) => {
  if (err) throw err;
  students = JSON.parse(data)
  
  students.forEach(student =>{
    couchAuth.insert("dbone", {_id : student.matetu, studentInfo:student})
  })
});
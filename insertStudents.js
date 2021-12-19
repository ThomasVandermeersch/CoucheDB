
const NodeCouchDb = require('node-couchdb');
const fs = require('fs');

const couchExternal = new NodeCouchDb({
  host: 'localhost',
  timeout : 10000,
  protocol: 'http',
  port: 5984,
  auth: {
    user: 'admin',
    pass: 'admin'
  }
});

fs.readFile('./students.json', 'utf-8', (err, data) => {
  if (err) throw err;
  students = JSON.parse(data)
  
  students.forEach(student =>{
    couchExternal.insert("students", {_id : student.matetu, annee : student.annetu, nom : student.npetu})
  })
});
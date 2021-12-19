const NodeCouchDb = require('node-couchdb');
var bodyParser = require('body-parser')

const express = require("express")
const delay = require('delay')
var connectTodbOne = true


const couchAuthOne = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'admin'
    }
});

const couchAuthTwo = new NodeCouchDb({
    host: 'localhost',
    timeout : 10000,
    protocol: 'http',
    port: 5984,
    auth: {
      user: 'admin',
      pass: 'admin'
    }
  });

const app = express()
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' -> (CSS, image, JS...)
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    if(connectTodbOne){
        couchAuthOne.get("students","_all_docs?include_docs=true").then(response=>{
            res.render("./index.pug",{users:response.data.rows,nbDB:0})
        })
        connectTodbOne = false
    }
    else{
        couchAuthTwo.get("students","_all_docs?include_docs=true").then(response=>{
            res.render("./index.pug",{users:response.data.rows, nbDB:1})
        })
        connectTodbOne = true
    }
})

app.post("/addStudent", async (req,res)=>{
    await couchAuthOne.insert("students", req.body)
    await delay(3000)
    res.redirect('/')
})

app.listen(8090)
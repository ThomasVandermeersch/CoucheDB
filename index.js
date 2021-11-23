const NodeCouchDb = require('node-couchdb');
const couch = new NodeCouchDb();

const express = require("express")

// const couch = new NodeCouchDb();
// const MemcacheNode = require('node-couchdb-plugin-memcached');
// const couchWithMemcache = new NodeCouchDb({
//     cache: new MemcacheNode
// });

// node-couchdb instance talking to external service
const couchExternal = new NodeCouchDb({
    host: 'couchdb.external.service',
    protocol: 'https',
    port: 5984
});
 
// not admin party
const couchAuth = new NodeCouchDb({
    auth: {
        user: 'admin',
        pass: 'admin'
    }
});

const app = express()
app.set('view engine', 'pug');
app.use(express.static('public')); //Load files from 'public' -> (CSS, image, JS...)



app.get('/',function(req,res){
    couchAuth.get("dbone","_all_docs?include_docs=true").then(response=>{
        // console.log(response)        
        // response.data.rows.forEach(element =>{
        //     console.log(element)
        // })

        res.render("./index.pug",{users:response.data.rows})
    })
 
})

app.listen(8090)
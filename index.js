const NodeCouchDb = require('node-couchdb');
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

app.get('/',function(req,res){
    res.send('Hello World')
    
})

app.listen(8090)
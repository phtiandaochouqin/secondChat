const express = require("express")

const app = express()
app.use(express.json({limit: '50mb'}));
app.set('secret','efssaq6w5e7qw8d')
app.use(require('cors')())
app.use(express.json())

require('./router/web/index.js')(app)
require('./plugins/db.js')(app)
app.use('/api/image', express.static(__dirname + '/upload'))



app.listen(9999,(req,res)=>{
    console.log('localhost:9999')
})
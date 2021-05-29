const mongoose = require('mongoose')
const schema = new mongoose.Schema({
   friendID:[{type:mongoose.SchemaTypes.ObjectId,ref:'User',require:true}],
    type:{type:Number,require:true},
},{timeStamps:true})
module.exports=mongoose.model('Friend',schema)
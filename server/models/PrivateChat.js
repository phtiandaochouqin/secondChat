const mongoose = require('mongoose')
const schema=mongoose.Schema({
    senderID:{type:mongoose.SchemaTypes.ObjectId,ref:'User',require:true},
    addressee:{type:mongoose.SchemaTypes.ObjectId,ref:'User',require:true},
    message:String,
    type:Number,
    isSee:{type:Number,default:0}
},{timestamps:true})
module.exports=mongoose.model('PrivateChat',schema)
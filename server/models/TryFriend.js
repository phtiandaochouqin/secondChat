const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  sender:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
  addressee:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
  message:String,
  isSee:{type:String,default:0},
  type:{type:String,default:0},
},{timestamps:true})

module.exports=mongoose.model('TryFriend',schema)
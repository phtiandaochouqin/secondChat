const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name:String,
    password:{
        type:String,
        set(val){
            return require('bcrypt').hashSync(val,10)
        }
    },
    details:String,
    gender:{type:String,default:'男'},
    phoneNumber:String,
    email:String,
    avatar:String,
    nickname:{type:String}
},{timestamps:true})
module.exports=mongoose.model('User',schema)
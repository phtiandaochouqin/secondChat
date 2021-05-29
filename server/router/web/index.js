module.exports= app =>{
    const mongoose=require('mongoose')
    const TryFriend=require('../../models/TryFriend')
    const User=require('../../models/User')
    const Friend=require('../../models/Friend')
    const PrivateChat=require('../../models/PrivateChat')
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const bcrypt=require('bcrypt')
    const multer=require('multer')
    const router = express.Router({
        mergeParams: true
      })
      socketUser={}
      userKey={}
     let io=require("socket.io")(app.listen(8082))
     io.on('connection',socket=>{
       let isUser=false
     socket.on('buildContent',async token=>{
       if(!token) return
     const {_id}= jwt.verify(token,app.get('secret'))
      if(!_id)return
     const user=await User.findById(_id) 
      if(!user)return
      socketUser[user._id]=socket.id   
      userKey[socket.id]=user._id
          io.to(socket.id).emit('Heartbeat')
          socket.forHeartbeat=setInterval(()=>{
            io.to(socket.id).emit('Heartbeat')
          },7000)
     })
     socket.on('disconnecting',()=>{
       console.log('离开了兄弟')
      if(socketUser.hasOwnProperty(userKey[socket.id])){
        delete socketUser[socket.id]
        delete userKey[socket.id]
        clearInterval(socket.forHeartbeat)
      }
    })
    
     })

        // 创建用户
      router.post('/create/account',async(req,res)=>{
        const {username,password,nickname,email}=req.body
        let user=await User.findOne({name:username})
        const checkNickname=await User.findOne({nickname})
        if(user){
          res.status('409')
          res.send({message:'用户名已存在'})
        }else if(checkNickname){
          res.status('408')
          res.send({message:'昵称已存在'})
        }else{
          let CreateUser=await User.create({name:username,password,nickname,email})
          const token=jwt.sign({_id:CreateUser._id},app.get('secret'))
          res.send({"_id":CreateUser._id,"avatar":CreateUser.avatar,"gender":CreateUser.gender,token})
        }
     
     
})


    // 用户登录
      router.post('/login',async(req,res)=>{
        const {username,userpassword} = req.body   
        const user=await User.findOne({name:username})
        const verifypass=bcrypt.compareSync(userpassword,user.password)
        const token=jwt.sign({"_id":user._id},app.get('secret'))
        const userInfo={
          avatar:user.avatar,
          createdAt:user.createdAt,
          details:user.details,
          email:user.email,
          gender:user.gender,
          name:user.name,
          nickname:user.nickname,
          phoneNumber:user.phoneNumber,
          _id:user._id
        }
        if(verifypass){
          res.send({token,userInfo})
        }
      })
      // 查用户名
      router.get('/check/username',async(req,res)=>{
        const username=req.query.username
      const user= await User.findOne({nickname:username})

      if(user){
       res.status('409')
       res.send({message:'exist'}) 
      }
      res.send({message:'用户名不存在' })
      })

      router.post('/insert',async(req,res)=>{
        const {friendID,type}=req.body
        console.log(type)
        await Friend.create({friendID,type})
        res.send('创建成功')
      })
  

      router.post('/user/update',async(req,res)=>{
        const {_id,data}=req.body
        await User.findByIdAndUpdate(_id,data)
        res.send('修改成功')
      })
      

      // 401错误方法
      const needToken=res=>{
        res.status('401')
        res.send({message:'出现异常错误'})
      }

        // 检查token方法
    const vertifyToken=async(req,res,next)=>{
      const token = String(req.headers.authorization || ' ').split(' ').pop()
     if(!token){
      needToken(res)
      return
     }
     const {_id}=jwt.verify(token,app.get('secret'))
     if(!_id){
      needToken(res)
      return
     }
     const user=await User.findById(_id,{password:0,name:0,updatedAt:0})
     if(!user){
      needToken(res)
      return
     }
     req._id=_id
     req.userInfo=user
      await next()
    } 


    
  router.post('/search/guys',vertifyToken,async(req,res)=>{
    const {name}=req.body
  let user=await User.find({nickname:{$regex:name}},{password:0,createdAt:0,updatedAt:0,__v:0}).lean()
 for(let [i,value] of user.entries()){
  const item= await Friend.find({$or:[{friendID:[req._id,value._id]},{friendID:[value._id,req._id]}]})
  if(item[0]){
    user[i].type=item[0].type
  }
 
 }
  res.send({user})
  })


    // 发送信息
      router.post('/send/message',vertifyToken,async(req,res)=>{
        let newFriend;
       const {addressee,message,type}=req.body
       const alreadyFriend=await Friend.find({$or:[{friendID:[req._id,addressee]},{friendID:[addressee,req._id]}]})
       if(alreadyFriend==false){
       newFriend= await Friend.create({friendID:[req._id,addressee],type:1})
       }
     const getMessage=await PrivateChat.create({senderID:req._id,addressee,message,type})
     if(socketUser[addressee]){
      io.to(socketUser[addressee]).emit('sendKey',getMessage)
      const checkUnread=await PrivateChat.find({senderID:req._id,addressee,isSee:0})
      io.to(socketUser[addressee]).emit('userList',{"lastMessage":getMessage,"_id":req._id,"length":checkUnread.length,newFriend:(alreadyFriend==false && req.userInfo)})
        
     }
     res.send(getMessage)
      })
      
      // 获得用户信息
      router.post('/user/info',vertifyToken,async(req,res)=>{
       res.send({
         "name":req.userInfo.name,
         "_id":req.userInfo._id,
         "createdAt":req.userInfo.createdAt,
         "avatar":req.userInfo.avatar,
         "details":req.userInfo.details,
         "email":req.userInfo.email,
         "gender":req.userInfo.gender,
         "nickname":req.userInfo.nickname,
         "phoneNumber":req.userInfo.phoneNumber
         
       })
        
      })
      // 获得用户聊天记录
      router.post('/get/defaultMessage',vertifyToken,async(req,res)=>{
        const {addressee}=req.body
       const getData=await PrivateChat.find({$or:[{senderID:req._id,addressee},{senderID:addressee,addressee:req._id}]})
        const userInfo=await User.findById(addressee,{password:0,__v:0,createdAt:0,email:0,name:0,updatedAt:0})
         res.send({"message":getData,info:userInfo})
      })

      // 更新用户资料
      router.post('/change/information',vertifyToken,async(req,res)=>{
        const {avatar,details,nickname,gender,phoneNumber,email}=req.body
       const newUser= await User.findByIdAndUpdate(req._id,{avatar,details,nickname,gender,phoneNumber,email})
       res.send({message:'修改成功'})
      })

      // 上传文件
      const upload=multer({dest:__dirname + '/../../upload'})
      app.post('/api/upload/image',vertifyToken,upload.single('file'),(req,res)=>{
        res.send(req.file.filename)
      })

      //用户聊天发送图片
      app.post('/api/send/image',vertifyToken,upload.single('file'),async(req,res)=>{
        const {addressee}=req.body
        const alreadyFriend=await Friend.find({$or:[{friendID:[req._id,addressee]},{friendID:[addressee,req._id]}]})
        if(alreadyFriend==false){
         await Friend.create({friendID:[req._id,addressee],type:1})
        }
      const imageMessage=await PrivateChat.create({senderID:req._id,addressee,message:req.file.filename,type:1,isSee:0})
      if(imageMessage){
        if(socketUser[addressee]){
          io.to(socketUser[addressee]).emit('sendKey',imageMessage)
          const checkUnread=await PrivateChat.find({senderID:req._id,addressee,isSee:0})
          io.to(socketUser[addressee]).emit('userList',{"lastMessage":imageMessage,"_id":req._id,"length":checkUnread.length,newFriend:(alreadyFriend==false && req.userInfo)})
         }  
        res.send(imageMessage)

      }
      })

      router.post('/alreadyread',vertifyToken,async(req,res)=>{
        const {addressee} = req.body 
       const updateSee= await PrivateChat.update({"senderID":addressee,"addressee":req._id,isSee:0},{isSee:1},{multi:true})
        res.send(updateSee)
      })

     router.post('/getHomeMessage',vertifyToken,async(req,res)=>{
       let tryMath=0;
      const getTryFrind=await TryFriend.find({"addressee":req._id})
    for(let item of getTryFrind){
      if(item.type==0){
        tryMath++;
      }
    }
    const senderInfo=await User.findById(getTryFrind[0].sender,{password:0})
      const getMessage=await PrivateChat.find({$or:[{"senderID":req._id},{"addressee":req._id}]}).lean()
      let newsList=[]
      getMessage.sort(createdAt)
      res.send({tryMath,"lastName":senderInfo.nickname,newsList})
     })

    //  查询用户名资料及是否是好友
     router.post('/getFriendInfo',vertifyToken,async(req,res)=>{
      
       const {_id}=req.body
       if(!_id){
        res.send('输入错误,或者该用户不存在')
        return
       }
       const friendStatus=await Friend.findOne({$or:[{"friendID":[req._id,_id]},{"friendID":[_id,req._id]}]}).catch(()=>{
       })
      const isFriend=friendStatus?friendStatus.type:0
      const user=await User.findById(_id).catch(()=>{})
      if(user){
        res.send({"avatar":user.avatar,"gender":user.gender,"nickname":user.nickname,"details":user.details,"isfriend":isFriend})       
      }else{
        res.send('输入错误或者该用户不存在')
      }
     })


     // 获得用户好友列表
     router.post('/check/friend',vertifyToken,async(req,res)=>{
      const userdata=await Friend.find({"friendID":req._id}).populate('friendID')
      if(!userdata)return
      const allFriend= userdata.map(item =>{
       const friend= item.friendID.filter(insideItem=>{
          if(insideItem._id !=req._id){
            return true
          }
        })
        return  {
          _id:friend[0]._id,
          name:friend[0].nickname,
          avatar:friend[0].avatar,
          gender:friend[0].gender
        }
      })
      for(let [index,userItem] of allFriend.entries()){
    const lastMessageItem= await PrivateChat.aggregate([
      { $match: {$or:[{senderID: new mongoose.Types.ObjectId(req._id),addressee:new mongoose.Types.ObjectId(userItem._id)},{addressee: new mongoose.Types.ObjectId(req._id),senderID:new mongoose.Types.ObjectId(userItem._id)}]}},
      {$sort:{createdAt:-1}},
      {$limit:1},
      {'$project': {_id:0,updatedAt:0,__v:0}}
     ])
     
     allFriend[index].lastMessage=lastMessageItem[0]
     const unread=await PrivateChat.find({addressee:req._id,senderID:userItem._id,isSee:0})
     allFriend[index].unreadLength=unread.length
      }
      res.send({allFriend})
    })


    router.post('/tryaddfriend',vertifyToken,async(req,res)=>{
      const {_id,message}=req.body
     const tryInfo= await TryFriend.create({sender:req._id,addressee:_id,message})
     console.log(tryInfo)
     res.send(tryInfo)
    })


    router.get('/getbaseinfo',async(req,res)=>{
      const {_id}=req.query
      const data=await User.findById(_id)
      res.send({nickname:data.name,avatar:data.avatar,gender:data.gender})
    })

app.use('/api',router)
}
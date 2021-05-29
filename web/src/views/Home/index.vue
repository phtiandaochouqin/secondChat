<template>
  <div class="home-container">
      <div class="top-header">
              <img v-if="$store.state.user.avatar" :src="baseURL+ '/image/' +$store.state.user.avatar" alt="" @click="$router.push('/information')">
              <img v-else :src="baseURL + '/image/' +$store.getters.genderAvatar" alt="" @click="$router.push('/information')">
          <div>
              <svg-icon icon-class="middle-logo"></svg-icon>
          </div>
        <div class="right-part">  
            <!-- <svg-icon @click="$router.push('/friend')" icon-class='search' class="left-icon"></svg-icon> -->
          <svg-icon icon-class="add" @click="clickSearch"></svg-icon>
          </div>
      </div>
      <div class="friend-container" v-if="friendList!=false">
        <div class="firend-item add-firend" v-for="item in friendList" :key="item._id" @click="$router.push('/eachother/'+item._id)">
            <div class="left-avatar">
               <img :src="baseURL+'/image/'+item.avatar" alt="" v-if="item.avatar">
               <img v-else-if="item.gender=='男'" :src="baseURL+ '/image/' + 'boy'" alt="">
               <img v-else-if="item.gender=='女'" :src="baseURL+ '/image/' + 'girl'" alt="">
                <div class="unread" v-if="item.unreadLength">{{item.unreadLength}}</div>
            </div>
            <div class="message-tip">
                <div class="top-tip">{{item.name}}</div>
                <div class="bottom-tip" v-if="item.lastMessage.type==0">{{item.lastMessage.message}}</div>
                <div class="bottom-tip" v-else>[图片]</div>

            </div>
            <div class="right-time">
               {{item.lastMessage.createdAt | fixTime}}
            </div>
        </div>
       
      </div>
      <div v-else class="lonely-container">
          <svg-icon icon-class="lonely" class="lonely"></svg-icon>
          <div class="title">一个好友都没有</div>
          <div class="search-friend" @click="clickSearch">搜索好友</div>
      </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import dayjs from 'dayjs'
export default {
data(){
    return{
     friendList:[]
    }
},
created(){
    this.buildSocket()
    this.$store.state.keepalive.keepList=[]
    this.$store.dispatch('user/getFriend').then(data=>{
        this.friendList=data
    })
    
},
 watch:{
  '$store.state.socket.$status':function(status){
    if(status==false){
       this.$store.dispatch('user/getFriend').then(data=>{
        this.friendList=data
    })
       this.$store.state.socket.$status=true
    }
    
  }
  },
computed:{
    baseURL(){
        return process.env.VUE_APP_BASE_API
    },
    ...mapState({
                $socket:state => state.socket.$switch
    })
},
methods:{
    clickSearch(){
    this.$router.push('/search')
    this.$store.state.keepalive.keepList.push('search')
},
buildSocket(){
          if(!this.$socket){
             this.$store.dispatch('socket/set_connection')
          }
                    this.$socket.on("userList", (socket) => {
                        // console.log(socket)
                   const checkIndex= this.friendList.findIndex(item=>{
                      return item._id==socket._id
                   })
                 if(this.friendList[checkIndex]){
                     this.friendList[checkIndex].unreadLength=socket.length
                     this.friendList[checkIndex].lastMessage=socket.lastMessage
                 }
                 const {newFriend}=socket
                 if(newFriend){
                     this.friendList.push({"lastMessage":socket.lastMessage,"name":newFriend.nickname,"avatar":newFriend.avatar,"gender":newFriend.gender,"unreadLength":socket.length,"_id":socket._id})
                 }


    });    
    },
},
filters:{
    fixTime(data){
       return dayjs(data).format('hh:mm')
    }
}
}
</script>

<style lang="scss">
$setColor1:#f2f2f2;
$setColor2:#020204;
$setColor3:#8d8d93;
$setColor4:#7a7b80;
$setColor5:#ffe431;
.home-container{
    width: 100%;
    padding: 1.79vh 4.4vw 1.0535vh 4.264vw;
    box-sizing: border-box;
    .top-header{
        box-sizing: border-box;
    width: 100%;
        padding-bottom: 1.3vw;
        height: 10.431vw;
        display: flex;
        justify-content: space-between;
        border-bottom: solid $setColor1 0.593vw;
        img{
            height:100%;
            width:8.537vw;
            border-radius: 10px;
        }
        .right-part{
            height: 100%;
            box-sizing: border-box;
            .left-icon{
                transform: translateX(-5.955vw);
            }
        }
        .svg-icon{
            height: 100%;
            width:8.537vw;
            }
}


.friend-container{
margin-top: 4.249vw;
.firend-item{
    margin-top: 3.971vw;
    box-sizing: border-box;
    height: 14.119vw;
    display: flex;
    .left-avatar{
        position: relative;
       .svg-icon{
       margin-top: 1.059vw;
    height:13.06vw;
    width: 14.119vw;
    border-radius: 30px;
    }
      img{
        height:13.06vw;
    width: 14.119vw;
    margin-top: 1.059vw;
        border-radius: 30px;

    }
    .unread{
        position: absolute;
        height: 4vw;
        background-color: red;
        top: 0;
        right: 0;
        border-radius: 50%;
        font-size: 3vw;
        color: white;
        padding: .5vw 1.5vw;
    }
    }

.message-tip{
    margin-top:2.657vw;
    flex:1;
    margin-left: 3.192vw;
    .top-tip{
        font-size: 4.797vw;
        color: $setColor2;
    }
    .bottom-tip{
        color: $setColor3;
        font-size: 3.859vw;
    }
}
.right-time{
        margin-top:2.657vw;
font-size: 3.325vw;
}
&.add-firend{
    margin-top: 0;
}
&:hover{
    background-color: #f3f4f6;
}
}

}


.lonely-container{
    .lonely{
        margin: 40.68vw 0 4.933vw 35.737vw;
        height: 30.255vw;
        width: 20.633vw;
    }
    .title{
        margin:0 0 5.067vw 32.852vw;
        font-size: 3.845vw;
        color: $setColor4;
    }
    .search-friend{
        margin-left: 29.777vw;
        background-color: $setColor5;
        height: 12.8vw;
        width: 31.989vw;
        border-radius: 50px;
        text-align: center;
        line-height: 12.8vw;
        font-size: 3.859vw;
    }
}
}
</style>
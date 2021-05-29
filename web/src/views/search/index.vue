<template>
  <div class="friendContainer">
      <div class="topHeader">
         <div class="left-part"> 
             <input type="text" class="left-input" @click="searchData($event.target.value.trim())" @input="searchData($event.target.value.trim())">
             <svg-icon icon-class="gray-search"></svg-icon>
         </div>
         <div class="right-part" @click="clickCancel">
             {{$t('cancel')}}
         </div>      
      </div>
      <div class="schema-container for-user" v-if="userFriend">
        <div class="main-title">{{$t('user')}}</div>
        <div class="user-item" v-for="item in userFriend" :key="item._id">
            <div class="avatar-container" @click="$router.push('/friendinfo/'+item._id)">
                <img v-if="item.avatar" :src="defaultURL+ '/image/' + item.avatar" alt="">
            <img v-else-if="item.gender=='男'" :src="defaultURL+ '/image/boy'" alt="">
            <img v-else :src="defaultURL+ '/image/girl'" alt="">
            </div>
            <div class="username" :title="item.name">{{item.nickname}}</div>
            <div class="right-message" @click="clickChat(item._id)">
            <span>{{$t('send')}}</span>
            <!-- <span v-else @click="$router.push('/addsendfriend/'+item._id)">加为好友</span> -->
            </div>
        </div>
      </div>
      <div class="schema-container for-grop" v-if="false">
        <div class="main-title">群组</div>
        <div class="user-item">
            <img src="@/temporary/02.jpg" alt="">
            <div class="username">这个是用户名</div>
            <div class="right-message">发消息</div>
        </div>
          <div class="user-item">
            <img src="@/temporary/02.jpg" alt="">
            <div class="username">这个是用户名</div>
            <div class="right-message">发消息</div>
        </div>
          <div class="user-item">
            <img src="@/temporary/02.jpg" alt="">
            <div class="username">这个是用户名</div>
            <div class="right-message">发消息</div>
        </div>
          <div class="user-item">
            <img src="@/temporary/02.jpg" alt="">
            <div class="username">这个是用户名</div>
            <div class="right-message">发消息</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'search',
    data(){
        return{
            avatar:'',
            userFriend:undefined,
            saveData:[],
            alarmClock:'123'
        }
    },
methods:{
    clickChat(path){
        this.$router.push({path:`/eachother/${path}`})
    },
    clickCancel(){
        this.$router.push('/home')
        this.$store.state.keepalive.keepList=[]
    },
    searchData(v){
        clearTimeout(this.alarmClock)
       this.alarmClock= setTimeout(()=>{
           if(this.sendMessage !=''){
                this.sendMessage(v)
           }
        },1000)
    },
    sendMessage(v){
        this.$store.dispatch('user/getSearchGuys',v).then(data=>{
            this.userFriend=data
        })
    }
    
},
computed:{
    defaultURL(){
        return process.env.VUE_APP_BASE_API
    }
}
}
</script>

<style lang="scss" scoped>
$setColor1:#f3f4f6;
$setColor2:#04040c;
$setColor3:#f0f0f0;
$setColor4:#020203;
$setColor5:#ffe731;
   .friendContainer{
       overflow: hidden;
       width: 100%;
       box-sizing: border-box;
        padding-top:1.79vh;
.topHeader{
    padding:0 0 1.733vw 4.264vw;
    height: 8.101vw;
    width: 100%;
    display: flex;
    margin-right: 3.881vw;
    align-items: center;
    border-bottom: 0.271vw $setColor3 solid;
    .left-part{
        margin-right: 3.881vw;
        height:100%;
        width: 79.859vw;
        position: relative;
 .left-input{
        width: 100%;
        height: 100%;
        background-color: $setColor1;
        outline: none;
        border: none;
        font-size: 5vw;
        border-radius: 10px;
    }
    .svg-icon{
        height:4.779vw;
        width:4.404vw;
        position: absolute;
        right: 2.119vw;
        top:1.713vw;
    }
    }
    .right-part{
        font-size: 3.859vw;
        color: $setColor2;
    }
}


.schema-container{
    margin:0 4.348vw 9.067vw 4.264vw;
    &.for-user{
        margin-top:5.325vw;
    }
    &.for-grop{
        margin-top: 9.067vw;
    }
.main-title{
margin:0 0 4.264vw 0;
font-size: 5.865vw;
color: $setColor4;
font-weight: 600;
}
.user-item{
    margin-top: 5.059vw;
    height: 10.927vw;
    display: flex;
    align-items: center;
    .avatar-container{
        height: 100%;
          img{
        height: 100%;
         border-radius: 20px;
    }
    }
    .username{
        line-height: 10.927vw;
        height:100%;
        margin-left: 4.273vw;
        font-weight: 500;
        font-size: 4.796vw;
        max-width: 50vw;
        overflow: hidden;
        text-overflow: ellipsis;
        flex:1;
    }
    .right-message{
        font-size: 3.207vw;
        border-radius: 40px;
        line-height: 6.669vw;
        text-align: center;
        height:6.669vw;
        width: 16.392vw;
        background-color: $setColor5;
    }
    &:first-child{
        margin-top: 0;
    }
}
}

   }

</style>
<template>
  <div class="add-send-friend">
        <div class="top-header">
      <svg-icon icon-class="left-arrow" class="left-icon" @click="$router.go(-1)"></svg-icon>
      <svg-icon icon-class="ellipsis" class="right-icon"></svg-icon>
    </div>
    <div class="avatar">
      <img v-if="avatar" :src="baseURL+'/image/'+avatar" alt="">
      <img v-else-if="gender=='男'" :src="baseURL+'/image/boy'" alt="">
      <img v-else-if="gender=='女'" :src="baseURL+'/image/girl'" alt="">

    </div>
    <div class="body-container">
      <div class="user-name">{{nickname}}</div>
      <div class="message-container">
        <textarea class="input-content" v-model="inputValue"></textarea>
      </div>
      <div class="button-container">
        <div class="left-button">{{$t('cancel')}}</div>
        <div class="right-button" @click="requestFriend">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    _id: { required: true }
  },
  data(){
    return {
      nickname:'',
      avatar:'',
      gender:'',
      inputValue:''
    }
  },
created(){
  this.$store.dispatch('user/getBaseInfo',this._id).then(data=>{
    // console.log(data)
   this.nickname=data.nickname
   this.avatar=data.avatar
   this.gender=data.gender
  })
},
computed:{
  baseURL(){
    return process.env.VUE_APP_BASE_API
  }
},
methods:{
  requestFriend(){
    this.$store.dispatch('message/tryAddfriend',{"_id":this._id,"message":this.inputValue})
    this.$message({
      type:"success",
      message:'发送成功',
      duration:'500'
    })
    this.$router.go(-1)
  }
}
}
</script>

<style lang="scss" scoped>
$setColor1:#ffe87f;
$setColor2:#fcfcfc;
$setColor3:#ffffff;
$setColor4:#f3f4f6;
$setColor5:#e9e9ea;
$setColor6:#ffe333;
$setColor7:#0c0d17;
.add-send-friend{
  background-color: $setColor1;
  height: 100vh;
  .top-header{
  padding: 3.456vw 4.133vw 0 4.4vw;
  height: 6.251vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $setColor1;
.left-icon{
  height: 100%;
   width: 3.6vw;
}
.right-icon{
  width: 7.196vw;
  height: 1.867vw;
}
}



.avatar{
  box-sizing: border-box;
  width: 33.867vw;
  height: 33.729vw;
  border: 0.933vw solid $setColor3;
  border-radius: 500px;
  position: absolute;
  left: 7.071vw;
  top:21.849vw;
   z-index:1;
   box-sizing: border-box;
  overflow: hidden;
  img{
    width: 100%;
  height: 100%;
  }
}


.body-container{
  border-radius: 3% 3% 0 0;
  width: 100%;
  background-color: $setColor3;
  position:fixed;
  top: 38.775vw;
  bottom: 0;
  .user-name{
    margin: 24.012vw 0 0 8.151vw;
    font-size: 6.659vw;
  }
  .message-container{
    color: $setColor7;
    box-sizing: border-box;
    border-radius: 5%;
    margin: 7.208vw auto 12.412vw;
    background-color:$setColor4;
    height:95.988vw;
    width: 85.051vw;
    font-size: 4.264vw;
    padding:3.333vw 3.067vw;
    .input-content{
      border:none;
      outline: none;
      background-color: transparent;
      resize: none;
      width: 100%;
      height: 100%;
      font-size: 5vw;
    }
  }
  .button-container{
    height: 10.761vw;
    display: flex;
    justify-content: space-between;
    padding: 0 4.133vw 4.525vw;
    text-align: center;
    font-size: 4.259vw;
    line-height: 10.761vw;
    .left-button{
      width: 23.048vw;
      height: 100%;
      border-radius: 10%;
      background:$setColor5;
    }
    .right-button{
      border-radius: 10%;
      width: 63.976vw;
      height: 100%;
      background-color: $setColor6;
    }
  }
}
}
</style>
<template>
  <div class="friend-info">
    <div class="header-container">
      <svg-icon icon-class="left-arrow" class="left-icon" @click="$router.go(-1)"></svg-icon>
      <!-- <svg-icon icon-class="ellipsis" class="right-icon" @click="$router.go(-1)"></svg-icon> -->
    </div>

    <div class="middle-background">
      <div
        v-if="avatar"
        class="middle-image"
        :style="{
          'background-image':
            'url(' + baseURL + '/image/'+ avatar +')',
        }"
      ></div>
      <div v-else-if="gender"  class="middle-image"
        :style="{
          'background-image':
            'url(' + baseURL + '/image/'+ friendGenderPath +')',
        }"></div>
      <div class="avatar-container">
          <img  v-if="avatar" :src="baseURL + '/image/' + avatar " alt="">
          <img v-else-if="gender" :src="baseURL + '/image/' + friendGenderPath" alt="">
      </div>
      <div class="info-container">
          <div class="user-name">{{nickname}}</div>
      <div class="user-description">{{details}}</div>
      </div>
    </div>

    <div class="addfriend-button" @click="$router.push('/eachother/'+_id)">
      <span>{{$t('send')}}</span>
      <!-- <span v-else>加为好友</span> -->
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      avatar:'',
    gender:'',
    nickname:'',
    details:'',
    isfriend:0
    }
  },
  created(){
    this.$store.dispatch('user/getFriendInfo',this._id).then(data=>{
      this.nickname=data.nickname
      this.avatar=data.avatar
      this.gender=data.gender
      this.details=data.details
      this.isfriend=data.isfriend
    })
  },
  computed: {
    friendGenderPath(){
        if(this.gender=='男'){
          return 'boy'
        }else if(this.gender=='女'){
          return 'girl'
        }
      },
    baseURL() {
      return process.env.VUE_APP_BASE_API;
    }
  },
    props:{
      _id:{required:true}
    }
};
</script>

<style lang="scss" scoped>
$setColor1: #ffe431;
$setColor2: #ffffff;
.friend-info {
  .header-container {
    padding: 1.79vh 4.129vw 0 4.4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-icon {
      width: 3.596vw;
      height: 6.528vw;
    }
    .right-icon {
      height: 2.133vw;
      width: 7.204vw;
    }
  }

  .middle-background {
    margin-top: 4.437vw;
    overflow: hidden;
    position: relative;
    .middle-image {
      position: relative;
      border-radius: 30px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 93vh;
      width: 100%;
      filter: blur(40px);
      z-index: -1;
    }
    .avatar-container {
      top: 10.533vw;
      left: 50%;
      transform: translateX(-50%);
      font-size: 10vw;
      position: absolute;
      border: $setColor2 0.8vw solid;
      border-radius: 45px;
      width: 53.333vw;
      height: 55.733vw;
      overflow: hidden;
      img{
          width: 100%;
          height: 100%;
      }
    }
    .info-container{
        padding: 0 13.333vw;
        overflow: hidden;
        position: absolute;
        top: 84.675vw;
          .user-name{
        font-size: 7.192vw;
        font-weight: 500;
    }
    .user-description{
        margin-top: 4.933vw;
        font-size: 4vw;
    }
    }
  }

  .addfriend-button {
    position: absolute;
    bottom: 10.535vw;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    height: 11.199vw;
    width: 91.471vw;
    background-color: $setColor1;
    line-height: 11.199vw;
    font-size: 4.528vw;
    font-weight: 700px;
    align-items: center;
    text-align: center;
    border-radius: 4%;
  }
}
</style>
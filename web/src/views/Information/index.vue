<template>
  <div>
    <div class="top-header">
      <svg-icon icon-class="left-arrow" @click="$router.go('-1')"></svg-icon>
      <div class="middle-title">详细</div>
    </div>
    <div class="form-body">
      <div class="form-item">
        <div class="item-title">{{$t('avatar')}}</div>
        <div class="item-middle">
         <el-upload
  class="avatar-uploader"
  action="http://localhost:9999/api/upload/image"
  :on-success="avatarSuccess"
  :show-file-list="false"
  :headers="setRquset"
  >
  <img v-if="avatar" :src="defaultsBaseURL+'/image/'+avatar">
  <img v-else :src="defaultsBaseURL+'/image/'+autoAvatarPath">
</el-upload>
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('description')}}</div>
        <div class="item-middle">
          <input type="text"  v-model="details"/>
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('create')}}</div>
        <div class="item-middle">{{createdAt | fixDay}}</div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('nickname')}}</div>
        <div class="item-middle">
            <input type="text" v-model="nickname">
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('gender')}}</div>
        <div class="item-middle">
          <el-select v-model="gender" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('phone')}}</div>
        <div class="item-middle">
          <input type="number" v-model="phoneNumber"/>
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
      <div class="form-item">
        <div class="item-title">{{$t('email')}}</div>
        <div class="item-middle">
          <input type="text" v-model="email"/>
        </div>
        <svg-icon icon-class="right-arrow"></svg-icon>
      </div>
    </div>
    <el-button type="success" class="save-data" @click="saveInformation">{{$t('save')}}</el-button>
    <div class="logout" @click="loginOut">{{$t('signOut')}}</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
    computed:{
        defaultsBaseURL(){
            return process.env.VUE_APP_BASE_API
        },
        autoAvatarPath(){
          if(this.gender=="男"){
            return 'boy'
          }else{
             return 'girl'
          }
        }

    },
    created(){
        this.$store.dispatch('user/getOwnInfo').then(data=>{
            this.gender=data.gender
            this.avatar=data.avatar
            this.nickname=data.nickname
            this.details=data.details
            this.phoneNumber=data.phoneNumber
            this.email=data.email
            this.createdAt=data.createdAt
        })
    },
  data() {
    return {
      options: [
        {
          value: "男",
          label: "男",
        },
        {
          value: "女",
          label: "女",
        },
      ],
      // 性别
      gender: "男",
      // 日期
      value2: "",
    //   文件上传请求头
      setRquset:{"Authorization": "bearer  " + this.$store.state.user.ownerToken},
    //   头像
      avatar:'',
    //   昵称
      nickname:'',
    //   签名
      details:'',
    //   注册日期
      createdAt:'',
    //   电话
    phoneNumber:'',
    email:''
    };
  },
  methods:{
      avatarSuccess(res){
          this.avatar=res
      },
      saveInformation(){
          this.$store.dispatch('user/saveInformation',{avatar:this.avatar,details:this.details,nickname:this.nickname,gender:this.gender,phoneNumber:this.phoneNumber,email:this.email}).then(()=>{
              this.$message({
                  message:this.$t('updateCompleted'),
                  type:'success',
                  showClose: true,
                  duration:1000
              })
            this.$store.state.user.avatar=this.avatar
          })
      },
      loginOut(){
          this.$store.commit('user/LOGIN_OUT')
          this.$router.replace('/login')
      }
  },
  filters:{
      fixDay(time){
          return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
      }
  }
};
</script>

<style lang="scss" scoped>
$setColor1: #f5f5f5;
$setColor2: #78797f;
$setColor3: #ff403e;
.top-header {
  padding: 1.79vh 0 2.925vw 4.4vw;
  display: flex;
  border-bottom: 0.271vw solid $setColor1;
  .svg-icon {
    height: 6.277vw;
    width: 3.604vw;
  }
  .middle-title {
    margin-left: 36.804vw;
    font-size: 5.196vw;
  }
}

.form-body {
  padding: 0 4.125vw 0 4.4vw;
  .form-item {
    display: flex;
    margin-top: 8.267vw;
    align-items: center;
    .item-title {
      margin-right: 4.156vw;
      font-size: 4.259vw;
    }
    .item-middle {
      flex: 1;
      font-size: 4.255vw;
      color: $setColor2;
      img {
        border-radius: 20%;
        width: 13.871vw;
        height: 14vw;
      }
      input {
        width: 100%;
        outline: none;
        border: none;
        color: inherit;
        height: 6vw;
      }
    }
    .svg-icon {
      height: 3.721vw;
      width: 2.139vw;
    }
  }
}

.save-data {
  margin-top: 10vw;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 15vw;
  height: 10vw;
  font-size: 5vw;
  padding: 0;
  text-align: center;
}

.logout {
  margin-top: 24.181vw;
  font-size: 4.263vw;
  color: $setColor3;
  text-align: center;
}

.el-select {
  width: 13vw;
  & /deep/ .el-input__inner {
    font-size: 4.259vw;
    height: 6.5vw;
    width:20vw;
  }
}
.el-select-dropdown__item {
  height: 7vw;
  font-size: 4.259vw;
}
.el-date-editor--datetime /deep/ .el-input__inner {
  width: 60vw;
  font-size: 4.259vw;
}
</style>
<template>
   <div class="form-create">
      <!-- 账号 -->
      <div class="form-item">
        <input type="text" v-model.trim="nameValue" :placeholder="$t('setName')" @blur="vertifyError('vertifyName')" @input="vertifyTrue('vertifyName')">
        <div class="tip">
          <span v-if="vertifyName==false" >{{nameError}}</span>
        </div>
      </div>    
     
      <!-- 密码 -->
      <div class="form-item passord-form">
        <input ref="passwordDom" v-model.trim="passwordValue" :type="passwordType" :placeholder="$t('setPassword')" @blur="vertifyError('vertifypassword')" @input="vertifyTrue('vertifypassword')">
        <div class="tip">
          <svg-icon :icon-class="passwordType=='password'?'eye-close':'eye-open'" @click.native="showPwd"></svg-icon>
        <div class="passwordError">{{passwordError}}</div>
        </div>
      </div>
      <!-- 创建按钮 -->
      <div class="create-button" @click="sendCreate()" :class="{'is-true':vertifyAll}">
        <svg-icon icon-class="loading" v-if="isLoading"></svg-icon>
        <div class="title">{{$t('loginIn')}}</div>
      </div>
    </div>
</template>

<script>
export default {
data(){
    return{
      nameValue:'',
      passwordValue:'',
        // 密码点击后切换
      passwordType:'password',
      // 账号验证
      vertifyName:'',
      nameError:'',
      // 密码验证
      vertifyPassword:'',
      passwordError:'',
      showButton:true,
      isLoading:false,
      redirect:''
    }
},

computed:{
  vertifyAll(){
    return this.nameValue && this.passwordValue
  },
},
watch:{
  '$i18n.locale'(){
    this.vertifyError('all')
  },
  $route:{
    immediate: true,
    handler(route){
     
    const {redirect} = route.query
    this.redirect=redirect
    
    },
  }
},
methods:{

    // 切换密码方法
    showPwd(){
       if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(()=>{
        this.$refs.passwordDom.focus()
        this.passwordError=''
      })
    },
     sendCreate(){
       this.vertifyError('login')
       if(!(this.vertifyPassword && (this.vertifyName != false))){
        return
       }
     
       this.isLoading=true
      this.$store.dispatch('user/loginIn',{username:this.nameValue,userpassword:this.passwordValue}).then(()=>{
          this.isLoading=false
          const redirect=this.redirect || '/home'
          this.$router.push(redirect)
      })
     
   
    },
    vertifyTrue(name){
       // 验证账号
     if(name=='vertifyName'){
       this.vertifyName=undefined
       if(this.nameValue.length >= 2){
         return
       }else{
         this.vertifyName=false
       }
     }
     // 验证密码
     if(name=='vertifypassword'){
     if(this.passwordValue.length>=8){
       this.vertifyPassword=true
       this.passwordError=''
     }else{
       this.vertifyPassword=false
     }
     }
    },
    vertifyError(name){
      // 验证账号
     if(name=='vertifyName' || (name=='all' && this.nameError != '') || name=='login'){
      //  账号不能为空
       if(this.nameValue==''){
        if(name!='login') return
        this.vertifyName=false
        this.nameError=this.$t('nameCantEmpty')
        // 账号长度不小于2位
       }else if(this.nameValue.length<2){
        this.vertifyName=false
        this.nameError=this.$t('nameLengthShort2')
      }
     }
     // 验证密码
     if(name=='vertifypassword' || (name=='all' && this.passwordError != '') || name=='login'){
       if(this.passwordValue==''){
        if(name!='login') return
        this.vertifyPassword=false
        this.passwordError=this.$t('passwordCantEmpty')
       }else if(this.passwordValue.length<8){
         this.vertifyPassword=false
         this.passwordError=this.$t('passwordLengthShort8')
       }else{
         this.passwordError=''
       }
     }

    }
  },
}
</script>

<style lang="scss" scoped>
$setColor1:#efefef;
$setColor2:#a6a6aa;
$setColor3:#ff7c7a;
$setColor4:#d4d4d6;
$setColor5:#f6f6f5;
$setColor6:#38a7ff;
@keyframes loading-rotate{to{transform:rotate(1turn)}}
.form-create{
  width: 100%;
  box-sizing:border-box;
  .form-item{
    display:flex;
    justify-content: space-between;
    box-sizing: border-box;
    height: 8.675vw;
    margin:5.672vh 3.892vw 0;
    border-bottom: $setColor1 0.3731vh solid;
    
    input{
      box-sizing: border-box;
      width:100%;
      height:100%;
      font-size: 4.403vw;
      border:none;
      outline: none;
       color: $setColor2;
    }
    .tip{
      height: 100%;
      padding-left: 5vw;
      flex-shrink: 0;
      right:0;
      font-size:4.136vw;
      color:$setColor3;
      box-sizing: border-box;
       .svg-icon{
         height:100%;
      max-width: 5.596vw;
    }
    }
  }
  .passord-form{
    position: relative;
.passwordError{
      color:inherit;
      position:absolute;
      left:0;
    }
  }
  .create-button{
    background-color:$setColor4;
     border-radius: 50px;
     width:70.005vw;
    height:13.341vw;
    position: absolute;
    left:14.9975vw;
    // outline: none;
    // border:none;
    margin-top:15.35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .svg-icon{
      position: absolute;
      left:20vw;
      top:3vw;
      width:8vw;
      height:8vw;
     animation:loading-rotate 3s linear infinite;
    }
  .title{
    font-size: 4.284vw;
    color:$setColor5;
  }
  &.is-true{
    background-color:$setColor6;
  }
  
  }
}
</style>
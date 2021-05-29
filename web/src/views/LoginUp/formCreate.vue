<template>
   <div class="form-create">
     <!-- 昵称 -->
      <div class="form-item">
        <input type="text" v-model.trim="nickValue" :placeholder="$t('setNickname')" @blur="vertifyError('vertifyNick')" @input="vertifyTrue('vertifyNick')">
        <div class="tip">
          <span v-if="vertifyNick==false" >{{nickError}}</span>
          <svg-icon v-else-if="vertifyNick==true" icon-class="tick"></svg-icon>
        </div>
      </div>    
       <!-- 账号 -->
      <div class="form-item">
        <input type="text" v-model.trim="nameValue" :placeholder="$t('setName')" @blur="vertifyError('vertifyName')" @input="vertifyTrue('vertifyName')">
        <div class="tip">
          <span v-if="vertifyName==false" >{{nameError}}</span>
          <svg-icon v-else-if="vertifyName==true" icon-class="tick"></svg-icon>
        </div>
      </div>    
      <!-- 邮箱 -->
       <div class="form-item">
        <input type="text" v-model.trim="emailValue" :placeholder="$t('setEmail')" @blur="vertifyError('vertifyEmail')" @input="vertifyTrue('vertifyEmail')">
         <div class="tip">
          <span v-if="vertifyEmail==false">{{emailError}}</span>
          <svg-icon v-else-if="vertifyEmail==true" icon-class="tick"></svg-icon>
        </div>
      </div>
      <!-- 密码 -->
      <div class="form-item passord-form">
        <input ref="passwordDom" v-model.trim="passwordValue" :type="passwordType" :placeholder="$t('setPassword')" @blur="vertifyError('vertifypassword')" @input="vertifyTrue('vertifypassword')">
        <div class="tip">
          <svg-icon :icon-class="passwordType=='password'?'eye-close':'eye-open'" @click.native="showPwd('passwordType','passwordDom')"></svg-icon>
          <svg-icon v-if="vertifyPassword==true" icon-class="tick"></svg-icon>
        <div class="passwordError">{{passwordError}}</div>
        </div>
      </div>
       <!-- 再次输入密码 -->
      <div class="form-item passord-form">
        <input ref="passSecondDom" v-model.trim="passSecondValue" :type="passSecondType" :placeholder="$t('setPassSecond')" @blur="vertifyError('vertifyPassSecond')" @input="vertifyTrue('vertifyPassSecond')">
        <div class="tip">
          <svg-icon :icon-class="passSecondType=='password'?'eye-close':'eye-open'" @click.native="showPwd('passSecondType','passSecondDom')"></svg-icon>
          <svg-icon v-if="vertifyPassSecond==true" icon-class="tick"></svg-icon>
        <div class="passwordError">{{PassSecondError}}</div>
        </div>
      </div>
      <!-- 创建按钮 -->
      <div class="create-button" @click="sendCreate()" :class="{'is-true':vertifyAll}">
        <svg-icon icon-class="loading" v-if="isLoading"></svg-icon>
        <div class="title">{{$t('signUp')}}</div>
      </div>
    </div>
</template>

<script>
export default {
data(){
    return{
      
      passSecondValue:'',
      passSecondType:'password',
      vertifyPassSecond:'',
      PassSecondError:'',
    // 昵称验证
      nickValue:'',
      vertifyNick:'',
      nickError:'',
      nameValue:'',
      emailValue:'',
      passwordValue:'',
        // 密码点击后切换
      passwordType:'password',
      // 账号验证
      vertifyName:'',
      nameError:'',
      // 邮箱验证
      vertifyEmail:'',
      emailError:'',
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
    return this.nameValue && this.emailValue && this.passwordValue && this.passSecondValue  && this.nickValue
  }
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
  getOtherQuery(query){
    return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
  },
    // 切换密码方法
    showPwd(type,dom){
       if (this[type] === 'password') {
        this[type] = 'text'
      } else {
        this[type] = 'password'
      }
      this.$nextTick(()=>{
        this.$refs[dom].focus()
      })
    },
    // 发送账密注册
     sendCreate(){
       this.vertifyError('login')
       if(!(this.vertifyEmail && this.vertifyPassSecond  && this.vertifyPassword && (this.vertifyName != false) && this.vertifyNick)){
        return
       }
       this.isLoading=true
      this.$store.dispatch('user/login',{username:this.nameValue,password:this.passwordValue,nickname:this.nickValue,email:this.emailValue})
      .then(()=>{
       this.$message({
          message:this.nameValue+' 恭喜您注册成功',
          type:'success',
          duration:500
        })
        this.isLoading=false
        const redirect=this.redirect || '/home'
        this.$router.push(redirect)

      })
      .catch(error =>{
        this.$message({
          showClose:true,
          message:error.status + ' ' + this.$t(error.status),
          type:'error',
        })
        this.isLoading=false
      })
    },
    vertifyTrue(name){
       // 验证昵称
     if(name=='vertifyNick'){
        this.vertifyNick=undefined
       if(this.nickValue.length >= 2){
              return
       }else{
         this.vertifyNick=false
       }
     }

       // 验证账号
     if(name=='vertifyName'){
       this.vertifyName=undefined
       if(this.nameValue.length >= 2){
         this.vertifyName=true
       }else{
         this.vertifyName=false
       }
     }
     // 验证邮箱
     if(name=='vertifyEmail'){
        if(/^[\w-.]+@[\w-.]+\.[\w-.]/.test(this.emailValue)){
         this.vertifyEmail=true
       }else{
         this.vertifyEmail=false
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
     //再次验证密码
     if(name=='vertifyPassSecond'){
       if(this.passwordValue==this.passSecondValue){
         this.vertifyPassSecond=true
          this.PassSecondError=''
       }else{
         this.vertifyPassSecond=false
         this.PassSecondError='两次密码输入不一致'
       }
     }
    },
    vertifyError(name){
      //验证昵称
      if(name=='vertifyNick' || (name=='all' && this.nickError != '') || name=='login'){
            // 若昵称输入为空的情况
         if(this.nickValue==''){
          //  name不能为login,name不能为all
        if(name!='login' && name!='all')return
        this.vertifyNick=false
        this.nickError=this.$t('nameCantEmpty')
        // 昵称长度不小于2位
       }else if(this.nickValue.length<2){
        this.vertifyNick=false
        this.nickError=this.$t('nameLengthShort2')
      }else{
        (name !='login' && name !='all') && this.$store.dispatch('user/vertifyAccount',this.nickValue).then(()=>{
          this.vertifyNick=true
        }).catch(()=>{
          this.vertifyNick=false
          this.nickError=this.$t('408')
        })
      }
      }

      // 验证账号
     if(name=='vertifyName' || (name=='all' && this.nameError != '') || name=='login'){
      //  账号不能为空
       if(this.nameValue==''){
        if(name!='login' && name!='all') return
        this.vertifyName=false
        this.nameError=this.$t('nameCantEmpty')
        // 账号长度不小于2位
       }else if(this.nameValue.length<2){
        this.vertifyName=false
        this.nameError=this.$t('nameLengthShort2')
      }
     }
     // 验证邮箱
     if(name=='vertifyEmail' || (name=='all' && this.emailError != '') || name=='login'){
      //  邮箱不能为空
      if(this.emailValue.length==''){
        if(name!='login' && name!='all') return
        this.vertifyEmail=false
        this.emailError=this.$t('emailCantEmpty')
        // 邮箱输入格式错误
       }else if(!/^[\w-.]+@[\w-.]+\.[\w-.]/.test(this.emailValue)){
         this.vertifyEmail=false
        this.emailError=this.$t('emailInputWrong')
        }
     }
     
     // 第二次验证密码
     if(name=='vertifypassword' || (name=='all' && this.passwordError != '') || name=='login'){
       if(this.passwordValue==''){
        if(name!='login' && name!='all') return
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
<template>
  <div class="login-container">
    <div class="header-container">
      <svg-icon icon-class="close"  @click="$router.push('/loginup')"></svg-icon>
    <div class="right-title" @click="$router.push('/loginup')">{{$t('create')}}</div>
    </div>
    <languageDrop/>
    <div class="logo"><svg-icon icon-class="middle-logo"></svg-icon></div>
      <div class="middle-title">{{$t('loginIn')}}</div>
      <div class="middle-description">{{$t('welcome')}}</div>
     <form-login></form-login>

  </div>
</template>

<script>
import formLogin from './formLogin'
import languageDrop from '@/components/languageDrop'

export default {
components:{
  formLogin,
  languageDrop
}
}
</script>

<style lang="scss" scoped>
$setColor1:#0e0e0e;
$setColor2:#ffe431;
$setColor3:#a1a2a6;
.login-container{
  .header-container{
    height: 4.8vw;
     padding: 1.79vh 7.599vw 0 8.263vw;
     display: flex;
     overflow: hidden;
     justify-content: space-between;
    .svg-icon{
      height: 100%;
      width:4.804vw;
    }.right-title{
      line-height: 1;
      font-size: 4.659vw;
      color:$setColor1;
    }
  }


  .logo{
    margin:13.871vw auto 0;
    width: 25.727vw;
      height: 11.992vw;
.svg-icon{
      width: 100%;
       height: 100%;
    }
  }


  .middle-title{
    margin:6.937vw 0 4.649vw 8.804vw;
    font-size: 7.071vw;
  }


.middle-description{
  font-size: 5.729vw;
  color: $setColor3;
}



}
</style>
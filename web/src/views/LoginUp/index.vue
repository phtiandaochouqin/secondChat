<template>
  <div>
    <!-- 头部跳转导航栏 -->
    <div class="navbar">
      <svg-icon icon-class="left-arrow" @click="$router.go(-1)"></svg-icon>
      <svg-icon icon-class="right-close" @click="$router.go(-1)"></svg-icon>
    </div>   
    <languageDrop/>
    <!-- LOGO图标 -->
    <div class="middle-logo">
      <svg-icon icon-class="middle-logo"></svg-icon>
    </div>
    <!-- 注册文字 -->
    <div class="middle-title">{{$t('createAccount')}}</div>
    <!-- !表单 -->
   <formCreate/>
    
  </div>
</template>

<script>
import languageDrop from '@/components/languageDrop'
import formCreate from './formCreate'
export default {
  components:{
    languageDrop,
    formCreate
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  box-sizing: border-box;
  padding: 1.79vh 4.48vw 0;
  display: flex;
  justify-content: space-between;
  height: calc(5.428vw + 1.79vh);
  .svg-icon {
    height: 100%;
    max-width: 5.428vw;
  }
}


.middle-logo{
width: 100%;
display:flex;
justify-content: center;
margin-top:6.169vh;
.svg-icon{
  width: 26.254vw;
  height: 12.125vw;
}
}


.middle-title{
  line-height: 1;
  font-size:7.443vw;
  margin:4.185vh 0 5.672vh 8.406vw;

}


</style>
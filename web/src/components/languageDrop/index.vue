<template>
    <!-- 语言下拉框组件 -->
   <div ref="languageContainer" class="language">
      <div class="icon">
        <div class="title">{{$t('language')}}</div>
        </div>
      <div  class="dropDown-container" :class="{'show-language':isShow}">
      <div class="dropDown-form">
          <div class="item" v-for="item in insideData" :key="item.name" @click="changeLanguage(item.value)">
          {{item.name}}
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
props:{
    insideData:{
       default(){
              return [{name:'中文',value:'zh'},{name:'English',value:'en'}]
    }
}
},
data(){
    return{
        // 控制是否显示下拉框
        isShow:false
    }
},
methods:{
    changeLanguage(value){
        this.$i18n.locale=value
        this.isShow=false
    },
    setMouseMove(){
 this.$refs.languageContainer.onmouseover=()=>{
    this.isShow=true
 }
 this.$refs.languageContainer.onmouseleave=()=>{
    this.isShow=false
 }
    }
},
mounted(){
this.setMouseMove()
}
}
</script>

<style lang="scss" scoped>
.language{
  position: absolute;
  cursor: pointer;
   position:absolute;
  top:1.79vh;
  height:9vw;
  left:37.383vw;
  .icon{
    background-color: #38a7ff;
    width:25.234vw;
    border-radius: 20px;
    height: 80%;
    display:flex;
    align-items: center;
    justify-content: center;
    .title{
      color:#fff;
      font-size: 5vw;
    }
  }
  .dropDown-container{
      visibility: hidden;
    border-radius: 10px;
    position: absolute;
    top:9vw;
    left:1.617vw;
    background: #38a7ff;
    width: 22vw;
    display: flex;
    justify-content: center;
    &::before{
      content:'';
      position:absolute;
      left:8vw;
      top: -5vw;
      border-style: solid;
      border-width: 3vw;
      border-color:transparent transparent #38a7ff transparent;
    }
    .dropDown-form{
    width: 100%;
    .item{
      font-size: 5vw;
      text-align: center;
      width: 100%;
      border-bottom: #fff solid 0.5vw;
      padding-top:1vh;
      padding-bottom: 1vw;
      color:#fff;
    }
  }
  }
.show-language.dropDown-container{
      visibility: visible;
  }
}
</style>
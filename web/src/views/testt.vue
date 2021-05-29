<template>
  <div class="test-container" ref="testt">
    <div class="left-squre" ref="leftSqure"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      setClock:null
    }
  },
mounted(){
  this.baseGenerate()
  document.addEventListener('scroll',this.baseGenerate)
},
methods:{
  baseGenerate(v){
    if(this.setClock){
        clearInterval(this.setClock)
      }
    let leftSqureTop=this.$refs.leftSqure.offsetTop
    const containerHeight=document.documentElement.scrollTop
    const getLeft=containerHeight+100-leftSqureTop
    let baseCount=0
    this.setClock=setInterval(()=>{
      if(baseCount<10){
        console.log(leftSqureTop+getLeft/10)
        this.$refs.leftSqure.style.top=leftSqureTop+getLeft/10 +'px'
        leftSqureTop=leftSqureTop+getLeft/10
        baseCount++;
      }else{
        clearInterval(this.setClock)
        this.setClock=null
      }
    },50) 
  },
}
}
</script>

<style>
.test-container{
  height: 10000px;
}
.left-squre{
  top:100px;
  width: 100px;
  height:100px;
  background-color: red;
  position:absolute;
}
</style>
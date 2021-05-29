import io from "weapp.socket.io"

const state={
isDisconnecting:false,
$switch:'',
$interval:'',
$status:true
}
const mutations={

CHANGE_CONNECTION(state){
state.isDisconnecting=!state.isDisconnecting
}
}
const actions={
set_connection({state}){
    let socketAlive=false
    state.$switch=io('localhost:8082')
    state.$switch.status=true
    state.$switch.emit('buildContent',this.getters.token)
    state.$switch.on('Heartbeat',()=>{
      socketAlive=true
    })
    state.$interval=setInterval(()=>{
      if(socketAlive){
        // console.log('测试存活')
        socketAlive=false
      }
      else{
        // console.log('断了兄弟')
        state.$switch.emit('buildContent',this.getters.token)
        state.$status=false
      }  
    },10000)
}
}
export default {
    namespaced:true,
    state,
    mutations,
    actions
}
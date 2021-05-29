import {setToken, getToken, removeToken} from '@/utils/auth'
import {login,vertifyAccount,getFriend,getUserInfo,getSearchGuys ,saveInformation, getHomeMessage,getFriendInfo,getBaseInfo} from '@/api/user'
import { loginIn } from '../../api/user'

const state={
    ownerName:'',
    ownerID:'',
    ownerToken:getToken(),
    avatar:'',
    gender:''
}
const mutations={
    SET_TOKEN(state,token){
    setToken(token)
    state.ownerToken=token
    },

    SET_BASE_INFO(state,data){
        if(!state.ownerToken){
            setToken(data.token)
            state.ownerToken=data.token
        }
        state.ownerID=data._id
        state.avatar=data.avatar
        state.gender=data.gender
    },
    

    SET_OWNER_INFO(state,data){
        state.ownerID=data._id
        state.avatar=data.avatar
    },

    LOGIN_OUT(state){
        removeToken()
        state.ownerID=''
        state.ownerToken=''
        state.avatar=''
    },

    SET_OWNER_GENDER(state,gender){
        state.gender==gender
    },

    

}
const actions={
    
    getHomeMessage({commit}){
      return new Promise((resolve,reject)=>{
        getHomeMessage().then(data=>{
           resolve(data)
        })
      })
    },


    // 搜索用户
    getSearchGuys({commit,state},name){
        return new Promise((resolve,reject)=>{
            getSearchGuys({name},state.ownerToken).then(data=>{
               resolve(data.user)
            })
        })
    },

    // 验证token,进行登录
    setUserInfo({commit,dispatch}){
        return new Promise((resolve,reject)=>{
            getUserInfo().then(data=>{
                if(!data){
                    reject(error)
                }
                commit('SET_BASE_INFO',{"_id":data._id,"avatar":data.avatar,"gender":data.gender})
                if(!this.state.socket.$switch){
                  dispatch('socket/set_connection',{},{root:true})
                }
                resolve()
              }).catch(error=>{
                reject(error)
              })
        })
    },
//    获取最新的用户信息
    getOwnInfo({commit}){
       return new Promise((resolve,reject)=>{
        getUserInfo().then(data=>{
            resolve(data)
        })
       })
    },
    // 注册账号
    login({commit},userinfo){
        return new Promise((resolve,reject)=>{
            const {username,password,nickname,email}= userinfo
            login({username,password,nickname,email}).then(data=>{
            commit('SET_BASE_INFO',{"_id":data._id,"avatar":data.avatar,"gender":data.gender,"token":data.token})
            resolve()
            }).catch(error=>{
               reject(error)
            })

        })
    },
    // 验证账号是不是已经注册了
    vertifyAccount({commit},username){
        return new Promise((resolve,reject)=>{
            vertifyAccount({username})
            .then(()=>{
                resolve()
            })
            .catch(error=>{
                if(error.data.message == 'exist'){
                    reject('exist')
                }
            })
        })
    },
    // 获取该账号有多少用户
    getFriend({commit}){
        return new Promise((resolve,reject)=>{
            getFriend().then(data =>{
                const {allFriend}=data
                resolve(allFriend)
            })
        })
    },

    // 登录
    loginIn({commit},data){
        return new Promise((resolve,reject)=>{
            const {username,userpassword}=data
            loginIn({username,userpassword}).then(data=>{
                const {userInfo}=data
                commit('SET_BASE_INFO',{"token":data.token,"avatar":userInfo.avatar,"_id":userInfo._id,"gender":data.gender})
                resolve()
            })
        })
    },
    // 保存用户信息
    saveInformation({commit,state},data){
        return new Promise((resolve,reject)=>{
            const {avatar, details, nickname, gender, phoneNumber, email} =data
        saveInformation({avatar, details, nickname, gender, phoneNumber, email}).then(()=>{
            state.gender=gender
            resolve()
        })
        })
        
    },

    getFriendInfo({commit},_id){
       return new Promise((resolve,reject)=>{
        getFriendInfo({_id}).then(data=>{
           resolve(data)
        })
       })
    },

    getBaseInfo({commit},_id){
        return new Promise((resolve,reject)=>{
            getBaseInfo({_id}).then(data=>{
               resolve(data)
            })
        })
    }
}
export default  {
namespaced:true,
state,
actions,
mutations
}
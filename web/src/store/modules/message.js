import {sendMessage,getDefaultData,tryAddfriend,alreadyRead} from '@/api/message'

const actions={
    sendMessage({commit},data){
       return new Promise((resolve,reject)=>{
        const {addressee,message,type}=data
        sendMessage({addressee,message,type}).then(data=>{
        resolve(data)
        })
       })
    },
    getDefaultData({commit},data){
        const {addressee}=data
        return new Promise((reject,resolve)=>{
            getDefaultData({addressee}).then(data=>{
                reject(data)
            }).catch(error=>{
                resolve(error)
            })
        })
    },

    tryAddfriend({commit},data){
        tryAddfriend({_id:data._id,message:data.message}).then(data=>{
        console.log(data)    
        })
    },

    alreadyRead({commit},addressee){
        alreadyRead({addressee}).then(data=>{
            // console.log(data)
        })
    }
}

export default  {
    namespaced:true,
    actions
}
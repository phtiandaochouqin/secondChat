import router from './router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import {Message} from 'element-ui'
Nprogress.configure({showSpinner: false})
const whiteList=['/login','/loginup']
router.beforeEach(async(to,from,next)=>{
Nprogress.start()
const token=store.getters.token
if(token){
    if(to.path=='/login'){
        next('/home')
    }
    const ownerID=store.getters.ownerID
    
    if(ownerID){
        next()
    }else{
        try{
           await store.dispatch('user/setUserInfo')
            next()
        }catch(error){
            store.commit('user/LOGIN_OUT')
            router.push(`/login?redirect=${to.path}`)
            Message({
                message:error || 'Has Error',
                type:'error'
            })
        }
    }
    
  
}
else{
if(whiteList.indexOf(to.path) !== -1){
    next()
}else{
next(`/login?redirect=${to.path}`)    
}

}
})
router.afterEach(()=>{
    Nprogress.done()
})
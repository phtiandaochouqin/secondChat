import Cookies from 'js-cookie'
const tokenKey= 'secondChatToken'
export function getToken(){
    return Cookies.get(tokenKey)
    }


export function setToken(value){
Cookies.set(tokenKey,value)
}


export function removeToken(value){
    Cookies.remove(tokenKey)
}

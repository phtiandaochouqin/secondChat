import request from '@/utils/request'
// 创建账号
export function login(data){
    return request({
        url:'/create/account',
        method:'post',
        data
    })
}


// 登录账号
export function loginIn(data){
    return request({
        url:'/login',
        method:'post',
        data
    })    
}

// 检查账号是否已注册
export function vertifyAccount(params){
    return request({
        url:'/check/username',
        method:'get',
        params
    })
}

// 拿到好友列表
export function getFriend(params){
    return request({
        url:'/check/friend',
        method:'post',
        params
    })
}

// 拿到用户信息
export function getUserInfo(){
    return request({
        url:'/user/info',
        method:'post',
    })    
}

// 搜索用户
export function getSearchGuys(data){
    return request({
        url:'search/guys',
        method:'post',
        data
    })
}

// 保存用户信息
export function saveInformation(data){
    return request({
        url:'/change/information',
        method:'post',
        data
    })
}


export function getHomeMessage(){
    return request({
        url:'/getHomeMessage',
        method:'post'
    })
}


export function getFriendInfo(data){
    return request({
        url:'/getFriendInfo',
        method: 'post',
        data
    })
}

export function getBaseInfo(params){
    return request({
        url:'/getBaseInfo',
        method:'get',
        params
    })
}
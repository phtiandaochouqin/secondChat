import request from '@/utils/request'
export function sendMessage(data){
    return request({
        url:'/send/message',
        method:'post',
        data

    })
}

export function getDefaultData(data){
    return request({
        url:'/get/defaultMessage',
        method:'post',
        data

    })
}

export function tryAddfriend(data){
    return request({
        url:'/tryaddfriend',
        method:'post',
        data
    })
}


export function alreadyRead(data){
    return request({
        url:'/alreadyread',
        method:'post',
        data
    })
}
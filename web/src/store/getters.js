
const getters={
    token:state =>  state.user.ownerToken,
    ownerID:state => state.user.ownerID,
    genderAvatar:state=>{
        if(state.user.gender == '男'){
            return 'boy'
        }
        return 'girl'
    },
    keepList:state => state.keepalive.keepList
}
export default getters
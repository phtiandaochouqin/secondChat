import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default new VueI18n({
  locale: 'zh',
  messages: {
    en:{
      'language':'语言',
      'createAccount':'Create account',
      'usernameExist':'User Name exist',
      'setName':'Set name',
      'setEmail':'Set email',
      'setPassword':'Set password',
      'nameLengthShort2':'Name length must have 2',
      'nameCantEmpty':"Name can't empty",
      'emailCantEmpty':"Email can't empty",
      'emailInputWrong':'Email input wrong',
      'passwordCantEmpty':"Password can't empty",
      'passwordLengthShort8':"Password length must have 8",
      '409':'User name already exists',
      '408':'Nick name already exists',
      'signUp':'Sign up',
      'setPassSecond':'Please input password again',
      'create':'Create',
      'setNickname':'Set nickname',
      'loginIn':'Login in',
      'welcome':'You are welcome to use',
      'avatar':'avatar',
      'description':'Description',
      'nickname':'Nickname',
      'gender':'Gender',
      'phone':'Phone',
      'email':'email',
      'save':'save',
      'signOut':'Sign out',
       'updateCompleted':'update completed',
       'cancel':'cancel',
       'send':'send',
       'user':'user',
       'littleSend':'send'
    },
    zh:{
      'language':'Language',
      'createAccount':'注册',
      'usernameExist':'用户名已有',
      'setName':'请取一个账号',
      'setEmail':'请输入邮箱',
      'setPassword':'这里输入密码',
      'nameLengthShort2':'用户名长度最少2位',
      'nameCantEmpty':"用户名不能为空",
      'emailCantEmpty':"邮箱不能为空",
      'emailInputWrong':'Email格式输入错误',
      'passwordCantEmpty':"密码不能为空",
      'passwordLengthShort8':"密码长度不能小于8位",
      '409':'用户名已存在',
      '408':'昵称已存在',
      'signUp':'注册',
      'setPassSecond':'请再次输入密码',
      'create':'注册',
      'setNickname':'请取一个昵称',
      'loginIn':'登录',
      'welcome':'您好 欢迎您使用',
      'avatar':'头像',
      'description':'签名',
      'gender':'性别',
      'phone':'电话',
      'nickname':'昵称',
      'email':'邮箱',
      'save':'保存',
      'signOut':'退出账号',
      'boy':'男',
      'updateCompleted':'修改成功',
      'cancel':'取消',
      'send':'发送消息',
      'user':'用户名',
      'littleSend':'发送'


    }
  }
})
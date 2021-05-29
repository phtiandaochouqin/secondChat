<template>
  <div class="eachother-container">
    <div class="eachother-header">
      <svg-icon icon-class="left-arrow" @click="$router.go(-1)"></svg-icon>
      <div>{{friendName}}</div>
      <img v-if="friendAvatar" :src="defaultsBaseURL+'/image/'+ friendAvatar" alt="" @click="$router.push('/friendinfo/'+_id)"/>
      <img v-else-if="friendAvatar==''" src="" alt="">
      <img v-else :src="defaultsBaseURL+'/image/'+ friendGenderPath" alt="" @click="$router.push('/friendinfo/'+_id)">
    </div>
    <div class="eachother-items" ref="bodyContainer">
      <div class="eachother-item" v-for="item in defaultData" :key="item._id">
        <div class="time" v-if="item.createdAt">{{ item.createdAt |fixTime(that)}}</div>
         <div class="left" v-if="item.senderID==_id">
          <img v-if="friendAvatar" class="avatar" :src="defaultsBaseURL+'/image/'+ friendAvatar" alt=""  @click="$router.push('/friendinfo/'+_id)"/>
          <img v-else class="avatar" :src="defaultsBaseURL+'/image/'+ friendGenderPath" alt="" @click="$router.push('/friendinfo/'+_id)">
           <div class="message">
            <div v-if="item.type == 1">
              <img :src="defaultsBaseURL+'/image/'+ item.message" alt="" class="type-image">
            </div>
            <div v-else v-html="item.message" class="html-message"></div>
          </div>
        </div>
        <div class="right" v-else>
          <div class="message">
            <div v-if="item.type == 1">
              <img :src="defaultsBaseURL+'/image/'+ item.message" alt="" class="type-image">
            </div>
            <div v-else v-html="item.message" class="html-message"></div>
          </div>
          <img class="avatar" v-if="$store.state.user.avatar" :src="defaultsBaseURL+'/image/'+ $store.state.user.avatar" alt=""  @click="$router.push('/information')"/>
          <img class="avatar" v-else :src="defaultsBaseURL + '/image/' + $store.getters.genderAvatar" alt="" @click="$router.push('/information')">
        </div>
      </div>
    </div>
    <div class="foot-container" ref="footContainer">
         <el-upload
  class="avatar-uploader"
  action="http://localhost:9999/api/send/image"
  :on-success="avatarSuccess"
  :show-file-list="false"
  :headers="setRquset"
  :data="{'addressee':_id}"
  >
  <svg-icon class="add" icon-class="camera"></svg-icon>
</el-upload>
      <div
        class="textarea"
        contenteditable="true"
        ref="textarea"
        @input="getInput($event.target.innerHTML)"
        @keyup.enter.exact="sendTextMessage('enter')"
      ></div>
      <svg-icon
        class="emoji"
        icon-class="emoji"
        @click="showEmoji = !showEmoji"
      ></svg-icon>
      <div class="emoji-grop" v-if="showEmoji">
        <div
          class="emoji-item"
          v-for="(item, index) in emoji"
          :key="index"
          @click="emojiItem(item)"
        >
          {{ item }}
        </div>
      </div>
      <div
        class="send"
        :class="{ active: sendActive }"
        @click="sendTextMessage"
      >
        {{$t('littleSend')}}
      </div>
    </div>
    <svg-icon class="stick" icon-class="stick"></svg-icon>
  </div>
</template>

<script>
import dayjs from "dayjs";
import {mapState} from 'vuex'
export default {
  props: {
    _id: { required: true },
  },
  data() {
    return {
      //   文件上传请求头
      setRquset:{"Authorization": "bearer  " + this.$store.state.user.ownerToken},
      friendAvatar:'',
      friendGender:'',
      friendName:'',
        that:this,
      // 是否显示表情
      showEmoji: false,
      // 表情
      emoji: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "🤣",
        "😂",
        "🙂",
        "🙃",
        "😉",
        "😊",
        "😇",
        "🥰",
        "😍",
        "🤩",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "🥵",
        "🥶",
        "😱",
        "😨",
        "😰",
        "😥",
        "😓",
        "🤗",
        "🤔",
        "🤭",
        "🤫",
        "🤥",
        "😶",
        "😐",
        "😑",
        "😬",
        "🙄",
        "😯",
        "😦",
        "😧",
        "😮",
        "😲",
        "😴",
        "🤤",
        "😪",
        "😵",
        "🤐",
        "🥴",
        "🤢",
        "🤮",
        "🤧",
        "😷",
        "🤒",
        "🤕",
        "🤑",
        "🤠",
      ],
      // 输入框值
      inputValue: "",
      // 输入框自动高度
      footDefaultH: "",
      // 发送按钮是否亮起
      sendActive: false,
      //聊天记录
      defaultData: [],
    //   发送信息最后的小时
    lastHours:'',
    //   发送信息最后的分钟
    lastMinutes:'',
    // 时间计算的变量
    timeMath:{},
    timer:null
    }
  },
  created(){
    this.getDefaultData();
  },
  mounted() {
    this.footDefaultH = this.$refs.footContainer.getBoundingClientRect().height;
     this.buildSocket() 
  },
  updated(){
    this.fixBodyHeight()
  },
  methods: {
    fixBodyHeight(){
      //    this.timer= setInterval(()=>{
      //        if(this.timer){
      //   clearInterval(this.timer)
      // }
      //  this.$refs.bodyContainer? this.$refs.bodyContainer.scrollTop =this.$refs.bodyContainer.scrollHeight :''
      // },500)
      setTimeout(()=>{
        this.$refs.bodyContainer? this.$refs.bodyContainer.scrollTop =this.$refs.bodyContainer.scrollHeight :''
      },500)
       
    },
    avatarSuccess(res){
          this.defaultData.push(res)
      },
      buildSocket(){
          if(!this.$socket){
             this.$store.dispatch('socket/set_connection')
          }
                    this.$socket.on("sendKey", (socket) => {
      this.defaultData.push(socket);
     this.$nextTick(()=>{
       if(this.$refs.bodyContainer){
         this.$refs.bodyContainer.scrollTop = this.$refs.bodyContainer.scrollHeight;
           this.$store.dispatch('message/alreadyRead',this._id)
       }
     })
    });    
    },
  
    getDefaultData() {
      this.$store
        .dispatch("message/getDefaultData", { addressee: this._id })
        .then(data => {
          const {info}=data
          this.defaultData = data.message;
          this.friendName=info.nickname;
          this.friendAvatar=info.avatar;
          this.friendGender=info.gender;
          this.$nextTick(() => {
            this.$refs.bodyContainer.scrollTop = this.$refs.bodyContainer.scrollHeight;
          });

          this.$store.dispatch('message/alreadyRead',this._id)
        });
      
    },
    emojiItem(value) {

      this.$refs.textarea.innerHTML += value;
      this.getInput(this.$refs.textarea.innerHTML);
      this.showEmoji = false;
    },
    sendTextMessage(params) {
      if (params == "enter") {
        this.inputValue = this.inputValue.substring(
          5,
          this.inputValue.length - 21
        );
      }
      this.$store.dispatch("message/sendMessage", {
        addressee: this._id,
        message: this.inputValue,
        type: 0,
      }).then(data=>{
          this.defaultData.push(data)
            this.$nextTick(() => {
            this.$refs.bodyContainer.scrollTop = this.$refs.bodyContainer.scrollHeight;
          });
          
      })
      this.inputValue = "";
      this.$refs.textarea.innerHTML = "";
      this.sendActive=false
    },
    getInput(value) {
      value != "" ? (this.sendActive = true) : (this.sendActive = false);
      this.autoHeight();
      this.inputValue = value;
    },
    // 自动调节高度
    autoHeight() {
      const nowHeight = this.$refs.footContainer.getBoundingClientRect().height;

      const nowLeft = nowHeight - this.footDefaultH;
      if (nowLeft != 0) {
        const bodyScroll = this.$refs.bodyContainer.scrollTop;
        this.$refs.bodyContainer.style.bottom = nowHeight + "px";
        this.footDefaultH = nowHeight;
        bodyScroll > 0 ? (this.$refs.bodyContainer.scrollTop += nowLeft) : "";
      }
    },
  },
  computed: {
    ownerID() {
      return this.$store.getters.ownerID;
    },
    ...mapState({
        $socket:state => state.socket.$switch
    }),
        defaultsBaseURL(){
          return process.env.VUE_APP_BASE_API 
      },
      friendGenderPath(){
        if(this.friendGender=='男'){
          return 'boy'
        }else{
          return 'girl'
        }
      }
  },
  watch:{
  '$store.state.socket.$status':function(status){
    if(status==false){
       this.getDefaultData()
       this.$store.state.socket.$status=true
    }
    
  }
  },
  filters:{
      fixTime(data,that){
           const mathValue = {};
      const nowDate = dayjs(new Date());
      const nowYear = nowDate.format("YYYY");
      const nowMonth = nowDate.format("MM");
      const nowDay = nowDate.format("DD");

        const sourceTime = dayjs(data);
        const getYear = sourceTime.format("YYYY");
        const getMonth = sourceTime.format("MM");
        const getDay = sourceTime.format("DD");
        const getHour = sourceTime.format("HH");
        const getMinute = sourceTime.format("mm");
        if (
          getYear == that.getYear &&
          getMonth == that.getMonth &&
          getDay == that.getDay &&
          getHour == that.getHour &&
          getMinute <= that.getMinute + 2
        ) {
            
          return ''
        } 
        
        else {
          if (getYear == nowYear && getMonth == nowMonth) {
            if (nowDay == getDay) {
              data = "今天 " + sourceTime.format("HH:mm");
            } else if (nowDay - 1 == getDay) {
              data = "昨天 " + sourceTime.format("HH:mm");
            } else if (nowDay - 2 == getDay) {
              data = "前天 " + sourceTime.format("HH:mm");
            } else {
              data = sourceTime.format("YYYY-MM-DD HH:mm");
            }
          } else {
            data = sourceTime.format("YYYY-MM-DD HH:mm");
          }
          that.getYear = getYear;
          that.getMonth = getMonth;
          that.getDay = getDay;
          that.getHour = getHour;
          that.getMinute = getMinute;
        }

        return data;
      }
  }
};
</script>

<style lang="scss" scoped>
$setColor1: #e7e7e7;
$setColor2: #b8b8bb;
$setColor3: #ffffff;
$setColor4: #f4f4f4;
$setColor5: #ffe431;
$setColor6: #e8e8e8;
$setColor7: #499dd9;
.eachother-container {
  box-sizing: border-box;
  min-height: 100vh;
  background-color: $setColor4;
  .eachother-header {
    top: 0;
    position: fixed;
    background-color: $setColor4;
    width: 100%;
    z-index: 1000;
    box-sizing: border-box;
    padding: 3.456vw 3.857vw 1.06vw 4.401vw;
    font-size: 5.597vw;
    height: 13.313vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: $setColor1 0.516vw solid;
    .svg-icon {
      height: 100%;
      width: 3.717vw;
    }
    img {
      height: 100%;
      width: 9.084vw;
      border-radius: 20px;
    }
  }

  .eachother-items {
    bottom: 22.267vw;
    position: absolute;
    top: 13.313vw;
    overflow-y: auto;
    background-color: $setColor4;
    margin-top: 4vw;
    width: 100%;
    .eachother-item {
      .time {
        margin-top: 6.019vw;
        text-align: center;
        margin-top: 6.019vw;
        font-size: 3.204vw;
        color: $setColor2;
        margin-bottom: 5.605vw;
      }
      &:first-child .time {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 5vw;
      }
      .left {
        display: flex;
        margin-top: 3vw;
        margin-left: 3.869vw;
        .avatar {
          height: 11.459vw;
          width: 11.459vw;
          border-radius: 30px;
          margin-right: 1.711vw;
        }
        .message {
          word-wrap: break-word;
          padding: 1.363vw 4.404vw 2.531vw 3.224vw;
          background-color: $setColor3;
          max-width: 64vw;
          border-radius: 0 30px 30px 30px;
          font-size: 4.388vw;
          line-height: 7.548vw;
           .html-message{
            max-width: 100%;
            overflow: hidden;
          }
          .type-image{
            width: 100%;
            
          }
        }
      }
      .right {
        display: flex;
        justify-content: flex-end;
        margin-right: 3.869vw;
        box-sizing: border-box;
        .avatar {
          height: 11.459vw;
          width: 11.459vw;
          border-radius: 30px;
          margin-left: 1.711vw;
        }
        .message {
          word-wrap: break-word;
          text-align: justify;
          padding: 1.363vw 3.224vw 2.531vw 4.404vw;
          background-color: $setColor5;
          box-sizing: border-box;
          max-width: 64vw;
          border-radius: 30px 0 30px 30px;
          font-size: 4.388vw;
          line-height: 7.548vw;
          overflow: hidden;
          .html-message{
            max-width: 100%;
            overflow: hidden;
          }
          .type-image{
            width: 100%;
            
          }
        }
      }
    }
  }

  .foot-container {
    border-top: 0.529vw solid $setColor6;
    background-color: $setColor4;
    padding: 1.465vw 0 10.659vw 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    position: fixed;
    justify-content: center;
    bottom: 0vw;
    .textarea {
      word-wrap:break-word;
      background-color: $setColor3;
      min-height: 9.615vw;
      overflow-y: auto;
      width: 60.537vw;
      max-height: 35vw;
      outline: none;
      border: none;
      border-radius: 10px;
      font-size: 5vw;
      resize: none;
    }
    .svg-icon {
      margin-top: 1.211vw;
      height: 7.723vw;
      width: 7.723vw;
      &.add {
        transform: translateX(-6vw);
      }
      &.emoji {
        transform: translateX(6vw);
      }
    }
    .send {
      color: $setColor2;
      position: absolute;
      bottom: 3vw;
      right: 6vw;
      font-size: 5vw;
      &.active {
        color: $setColor7;
        font-weight: 600;
      }
    }
    .emoji-grop {
      padding-top: 1vw;
      position: absolute;
      top: -93vw;
      right: 0vw;
      background-color: $setColor4;
      border: 1vw solid $setColor2;
      width: 50vw;
      height: 90vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .emoji-item {
        width: 15%;
        font-size: 5vw;
      }
    }
  }
  .stick {
    width: 35.995vw;
    height: 1.585vw;
    position: fixed;
    bottom: 2.252vw;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
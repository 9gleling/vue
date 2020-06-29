<template>
<div id="wrap_chat">
    <div id="header">
        <div class="status_bar">

        </div>
        <div class="gnb">
            <div class="back">
                <router-link to="/list" class="btn_back">
                    <img src="@/assets/images/img-back.png" class="img_back">
                </router-link>
            </div>
            <div class="gnb_text">
                <span>{{chatName}}</span>
            </div>
            <div class="upload_list">
                <a v-on:click="imgUpload('upload')" class="img_upload">
                <img src="@/assets/images/img-upload.png" >
                </a>
                <input type="file" round class="upload" v-on:change="onFileChange" style="display:none;">
            </div>
            <div class="multi_upload_list">
                <a v-on:click="chkLocalImg()" class="multi_img_upload">
                <img src="@/assets/images/img-upload.png" >
                </a>
                <input type="file" round class="upload" v-on:change="onFileChange" style="display:none;">
            </div>
        </div>
        <!-- <div v-show="localImgFlag" class="wrap_img_list">
            <ul id="local_img_list">
                <li v-for="(item, key) in localImgList" v-bind:key="key">
                    <a v-on:click="sendLocalImg(item)">
                        <img :src="item">
                    </a>
                </li>
            </ul>
        </div> -->
    </div>
    <div id="wrap_chat_list" >
        <ul class="chat_list" id="chat_list">
            <template v-for="(chat, key) in chatData" >
                <li class="chat_timestamp" v-if="chat.chkFirstMsg === 'Y'" v-bind:key="key+chat.createdTime">{{moment(chat.createdTime).format('ll')}}</li>
                <li class="message" v-bind:key="key" v-bind:class="chat.chkMyContent == 'N' ? 'incoming_message' : 'sent_message'">
                    <div class="message_content">
                        <span v-if="chat.content" class="message_bubble">
                        {{chat.content}}
                        </span>
                        <div v-if="chat.imgContent">
                            <img v-bind:src="chat.imgContent" class="img_list">
                        </div>
                        <span class="message_time" v-if="moment(chat.createdTime).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') && chat.displayTime === 'Y'"> 
                            {{moment(chat.createdTime).format('hh:mm')}}
                        </span>
                        <span class="message_time" v-else-if="chat.displayTime === 'Y'">
                            {{moment(chat.createdTime).format('YYYY-MM-DD hh:mm')}}
                        </span>
                    </div>
                </li>
            </template>
        </ul>
    </div>
    <div class="wrap_send_message">
        <form v-on:enter.prevent="sendMessage">
            <input type="text" class="inputText" v-model="inputVal" placeholder="메세지를 입력하세요.">
            <button v-on:click.prevent="sendMessage" class="send_msg"><img src="@/assets/images/img-send.png" class="img_send"></button>
        </form>
        <div v-if="imgVal" class="chk_img">
            <img src="@/assets/images/img-upload.png" >
        </div>
    </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'RoomComponent',
    created() {
        this.getChatData(this.$route.params.Id);

        // this.$store.dispatch('getChatData', this.$route.params.Id);
    },
    data: function () {
        return {
            inputVal: '',
            imgVal: '',
            imgLocalVal: '',
            localImgList: [],
            localImgFlag: false,
            scrollTop: 0,
        }
    },
    computed: {
        ...mapState({
            'roomLists': state => state.chatStore.roomData,
            'chatData': state => state.chatStore.chatData,
            'chatName': state => state.chatStore.chatName,
            'chkFirstMsg': state => state.chatStore.chkFirstMsg,
        }),
    },
    watch: {
        chatData() {
            this.moveScroll();
        }
    },
    methods: {
        ...mapActions([
            'getChatData',
            'sendMsg',
        ]),

        sendMessage() {
            const params = {};
            params.roomId = this.$route.params.Id;
            params.content = this.inputVal;
            params.imgContent = '';
            if(this.imgVal) params.imgContent = this.imgVal
            else if(this.imgLocalVal) params.imgContent = this.imgLocalVal;
            
            if(params.content.trim() || params.imgContent) {
                this.sendMsg(params);
                setTimeout(this.incomingMsg, 1000);
                
                this.inputVal = '';
                this.imgVal = '';
                this.imgLocalVal = '';
            }

        },
        incomingMsg() {
            const params = {};
            params.roomId = this.$route.params.Id;
            params.content = '응';
            params.userName = this.chatName;
            
            this.sendMsg(params);
        },
        imgUpload: function(el) {
            const elem = document.querySelector('.'+el);
            elem.click();
        },
        moveScroll() {
            const objDiv = document.querySelector("#wrap_chat_list");

            if(this.scrollTop < objDiv.scrollHeight)
                this.scrollTop = objDiv.scrollHeight + 150;

            window.scrollTo(0, this.scrollTop)
        },
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files
            
            if (!files.length) {
                return
            }
            this.createImage(files[0])
        },
        createImage(file) {
            var reader = new FileReader()

            reader.readAsDataURL(file)
            reader.onload = (e) => {
                this.imgVal = e.target.result
            }
        },
        sendLocalImg(imgName) {
            
            this.imgLocalVal = imgName;
            this.sendMsg();
        },
        chkLocalImg() {
            if(this.localImgFlag) this.localImgFlag = false;
            else this.localImgFlag = true;  
        },
    },
}
</script>

<style>
#wrap_chat {
    display: block;
    padding: 63px 0px 50px 0px;
}

#header {
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;

    height: 64px;
    color: white;
    background: var(--purple);
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
}

#wrap_chat #header .status_bar {
    position: flex;
    height: 20px;
    background-color: var(--purple);

}

   
#wrap_chat #header .gnb .back {
    position: absolute;
    left: 12px;
    width: 24px;
    height: 24px;
    object-fit: contain;

}

#wrap_chat #header .gnb {
    display: flex;
    width: 100%;
    height: 44px;
    background-color: var(--purple);
}

#wrap_chat #header .gnb .gnb_text {
    width: 100%;
    display: block;
    text-align: center;
}

#wrap_chat #header .gnb .gnb_text span {
    width: 30px;
    height: 20px;
    font-family: AppleSDGothicNeo;
    font-size: 17px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.12px;
    text-align: center;
    color: var(--white);
    
}

#wrap_chat #header .gnb .upload_list {
    position: absolute;
    right: 53px;
    
}

#wrap_chat #header .gnb .upload_list .img_upload {
    width: 24px;
    height: 24px;
    object-fit: contain;
    
}

#wrap_chat_list {
    background-color: var(--pale-grey);
}

.wrap_img_list { 
    display: flex;
    
    height: 68px;
    background-color: var(--purple);
}
#local_img_list {
    padding: 0px;
    margin: 0px 16px 0px 16px;
    display: flex;
    white-space: nowrap;
    align-content: flex-start;
    overflow-x: scroll;

    /* background-color: var(--purple); */

}

#local_img_list li {
    padding-right: 11px;
    
}

#local_img_list li img {
    width: 46px;
    height: 46px;
}

#wrap_chat_list ul {
    border-top: 1px solid #f7f7f7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0px 20px;
    padding-top: 30px;
}

#wrap_chat_list ul li {
    margin: 5px 10px;
}

#wrap_chat_list ul li.sent_message .message_bubble {
    border-bottom-right-radius: 0px;
    background-color: var(--purple);
    box-shadow: 0 2px 4px 0 rgba(91, 56, 177, 0.4);
}

#wrap_chat_list ul li.incoming_message .message_bubble {
    margin-top: 10px;
    display: block;
    border-bottom-left-radius: 0px;

    background-color: var(--white);
    color: var(--charcoal-grey-two);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.message_time {
    font-family: AppleSDGothicNeo;
    font-size: 12px;
    color: #a4a6b0; 
    display: block;
    padding-top: 5px;
}

@keyframes incomingAnim {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sentAnimation {
  from {
    opacity: 0;
    transform: translateX(200px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.sent_message {
    /* animation: sentAnimation 0.5s ease-out forwards; */
    align-self: flex-end;
}

.sent_message .message_time {
    text-align: right;
}

.incoming_message {
    /* animation: incomingAnim 0.5s ease-out forwards; */
    align-self: flex-start;
}

.incoming_message .message_time{
    text-align: left;
}



.img_list {
    width: 200px;
    height: 200px;
    border-radius: 12px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    background-color: #47909b;
}

.message .message_bubble {
    max-width: 200px;
    text-align: left;
    word-break:break-all;

    background-color: var(--white);
    display: block;
    
    padding: 10px 20px;
    border-radius: 12px;
    color: var(--white);
    font-weight: 600;

    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.1px;
}
    

#wrap_chat_list ul .chat_timestamp{
    background-color: var(--white);
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 10px;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 8px 16px -8px, rgba(0, 0, 0, 0.024) 0px -6px 16px -6px;
    text-transform: uppercase;
    font-weight: 700;
}

.wrap_send_message {
    position: fixed;

    bottom: 0px;
    left: 0;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    width: 375px;


    height: 50px;
    border-radius: 25px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

}

    .inputText {
        width: 281px;
        height: 50px;
        border-radius: 25px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: var(--white);

        /* margin: 0 auto; */
        bottom: 0px;
        /* width: 100%; */
        /* border-radius: 0; */
        /* padding: 20px 60px; */
        /* width: 100%; */
        /* border: none; */
        /* font-size: 14px; */
        transition: width 0.5s ease-in-out, box-shadow 0.5s ease-in-out, border-radius 0.5s ease-in-out, transform 0.5s ease-in-out;

    }

    .img_send {
        width: 26px;
        height: 18px;
        object-fit: contain;
    }

    .send_msg {
        right: 10px;
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: var(--purple);
    }

    .chk_img {
        right: 95px;
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-color: var(--purple);
    }

    .chk_img img {
        position: relative;
        top: 12px;
    }

ul { 
    list-style: none;
}

 
</style>
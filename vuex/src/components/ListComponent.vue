<template>
<div id="wrap_room">
    <div id="header">
        <div class="status_bar">

        </div>
        <div class="gnb">
            <div class="back">
                <router-link to="/" class="btn_back">
                    <img src="@/assets/images/img-back.png" class="img_back">
                </router-link>
            </div>
            <div class="gnb_text">
                <span>채팅</span>
            </div>
        </div>
    </div>
    <div id="wrap_room_list">
        <ul class="room_list">
            <li class="list" v-for="room in roomLists" v-bind:key="room.roomId">
            <router-link :to="/room/+room.roomId">
                <div class="wrap_friend">
                    <div class="friend_list photo">
                        <img v-bind:src="room.imgProfile">
                        <div class="friend_content">
                        <span class="friend_name">
                            {{room.name}}
                        </span>
                        <span class="friend_bottom_text">
                            {{room.currentMsg}}
                        </span>
                        </div>
                    </div>
                    <div class="friend_list info">
                        <div class="updated_time">
                            <span v-if="moment(room.updatedTime).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')">
                                {{moment(room.updatedTime).format('hh:mm')}}
                            </span>
                            <span  v-else>
                                {{moment(room.updatedTime).format('MM-DD')}}
                            </span>

                        </div>
                        <div class="" v-bind:class="room.unreadMsgCnt > 0 ? 'unread_msg' : ''">
                            <span v-if="room.unreadMsgCnt > 0">
                                {{room.unreadMsgCnt}}
                            </span>
                        </div>
                    </div>
                </div>
            </router-link>
            </li>
        </ul>
    </div>
</div>  
</template>

<script>
export default {
    name: 'ListComponent',
    data () {
        return {
        }
    },
    created() {
        this.$store.dispatch('getRoomList');
    },
    computed: {
        roomLists() {
            return this.$store.state.chatStore.roomData;
        },
        hasRoomList() {
            return this.roomLists.length > 0
        }
    },
    methods: {
        moveScroll() {
            window.scrollTo(0, 0);
        },
        sendMsg() {
            
            const params = {};
            params.roomId = 1;
            params.content = '술먹자' 
            params.userName = '승민';

            this.$store.dispatch('sendMsg', params);
            this.$store.dispatch('getRoomList');
        },
        sendMsg2() {
            
            const params = {};
            params.roomId = 2;
            params.content = '??????' 
            params.userName = '호필';

            this.$store.dispatch('sendMsg', params);
            this.$store.dispatch('getRoomList');
        },
    },
    mounted() {
        setInterval(this.sendMsg, 5000);
        setInterval(this.sendMsg2, 2000);
    },
    beforeDestroy(){
        clearInterval(this.sendMsg);
    }

}
</script>

<style>

#app {
    background: var(--pale-grey);
    min-height: 700px;
}

#wrap_room {
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
    background-color: var(--purple);
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
}

#wrap_room #header .status_bar {
    display: flex;
    height: 20px;
    background-color: var(--purple);

}

#wrap_room #header .gnb {
    display: flex;
    width: 100%;
    height: 44px;
    background-color: var(--purple);
}

#wrap_room #header .gnb .gnb_text {
    width: 100%;
    display: block;
    text-align: center;
    
}

#wrap_room #header .gnb .gnb_text span {
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

#wrap_room ul {
    animation: fadeIn 0.5s ease-in-out;
    list-style: none;
    margin: 5px 10px;
    padding: 0;
    width: 100%;
    background-color: var(--white);
    
}

#wrap_room ul li{
    animation: fadeIn 0.5s ease-in-out;
    /* list-style: none; */
    margin: 5px 10px;
 
}

#wrap_room ul li .wrap_friend {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow:hidden;
}

#wrap_room ul li .wrap_friend .friend_list {
    display: flex;
    float:left;
    align-items: center;
    text-align: left;
    
}

#wrap_room ul li .wrap_friend .friend_list .friend_name {   
    display: block;
    margin-bottom: 5px;   
}

#wrap_room ul li .wrap_friend .friend_list .friend_bottom_text {
    opacity: 0.7;
    font-size: 12px;
    
}

#wrap_room ul li .wrap_friend .friend_list .updated_time {
    position: relative;
    top:-10px;
    right: 0;
    width: 29px;
    height: 13px;
    opacity: 0.4;
    font-family: AppleSDGothicNeo;
    font-size: 11px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: right;
    color: var(--charcoal-grey-two);

}
    
#wrap_room ul li .wrap_friend .friend_list .unread_msg {
    position: relative;
    top: 10px;
    right: 17px;
    width: 18px;
    height: 18px;
    border-radius: 10.5px;
    background-color: var(--purple);

    font-family: AppleSDGothicNeo;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.08px;
    text-align: center;
    line-height: 19px;
    color: var(--white);
}

.photo img {
    width:56px; 
    height:56px; 
    border-radius:50%; 
    margin-right: 15px;

}

a {
  color: inherit;
  text-decoration: none;
}

.select_thema {
    position: fixed;
    padding: 20px;

    bottom: 0px;
    left: 0;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    width: 375px;


    height: 50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
/* #wrap_room ul li .wrap_friend .friend_list .unread_msg span {
    width: 6px;
    height: 10px;
    font-family: AppleSDGothicNeo;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.08px;
    text-align: center;
    color: var(--white);

} */
/* h1, p {
  margin: 0;
} */

/* main {
  padding: 1rem;
  height: 100%;  
} */

/* body {
  padding-top: 75px;
  background: #EEE;
} */

/* body, html {
  height: 200%;
} */

* {
  box-sizing: border-box;
}

</style>

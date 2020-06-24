import moment from 'moment'
export default {
    data: [
        {
            "roomId": 1,
            "name": "승민",
            "imgProfile": require('../assets/images/sm.png'),
            "createdTime": "2020-05-01 13:20:20",
            "updatedTime": "2020-05-31 14:02:30",
            "currentMsg": "지금은 안댐",
            "unreadMsgCnt": 0,
            "roomInfo": [
                {
                    "id": 1,
                    "userName": "진혁",
                    "chkMyContent": "Y",
                    "isRead": "Y",
                    "content": "야!",
                    "imgContent": null,
                    "chkFirstMsg": "Y",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:00:00"
                },
                {
                    "id": 2,
                    "userName": "승민",
                    "chkMyContent": "N",
                    "isRead": "Y",
                    "content": "왜?",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:01:00"
                },
                {
                    "id": 3,
                    "userName": "진혁",
                    "chkMyContent": "Y",
                    "isRead": "Y",
                    "content": "술먹자",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:01:30"
                },
                {
                    "id": 4,
                    "userName": "승민",
                    "chkMyContent": "N",
                    "isRead": "Y",
                    "content": "몇시에?",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:02:00"
                },
                {
                    "id": 5,
                    "userName": "진혁",
                    "chkMyContent": "Y",
                    "isRead": "Y",
                    "content": "지금",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:02:10"
                },
                {
                    "id": 6,
                    "userName": "승민",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "지금은 안댐",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:02:30"
                }
            ]
        },
        {
            "roomId": 2,
            "name": "호필",
            "imgProfile": require('../assets/images/basic.png'),
            "createdTime": "2020-05-01 13:20:20",
            "updatedTime": "2020-05-31 18:02:30",
            "currentMsg": "????????",
            "unreadMsgCnt": 0,
            "roomInfo": [
                {
                    "id": 1,
                    "userName": "호필",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "?????",
                    "imgContent": null,
                    "chkFirstMsg": "Y",
                    "displayTime": "N",
                    "createdTime": "2020-05-31 14:00:00"
                },
                {
                    "id": 2,
                    "userName": "호필",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "???",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-05-31 14:00:30"
                },
                {
                    "id": 3,
                    "userName": "호필",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "????????",
                    "imgContent": null,
                    "chkFirstMsg": "Y",
                    "displayTime": "Y",
                    "createdTime": "2020-06-01 12:00:00"
                }
            ]
        },
        {
            "roomId": 3,
            "name": "상현",
            "imgProfile": require('../assets/images/sh.png'),
            "createdTime": "2020-05-01 13:20:20",
            "updatedTime": "2020-06-01 08:30:30",
            "currentMsg": "야",
            "unreadMsgCnt": 0,
            "roomInfo": [
                {
                    "id": 1,
                    "userName": "상현",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "야!",
                    "imgContent": null,
                    "chkFirstMsg": "Y",
                    "displayTime": "Y",
                    "createdTime": "2020-06-01 08:20:30"
                },
                {
                    "id": 2,
                    "userName": "상현",
                    "chkMyContent": "N",
                    "isRead": "N",
                    "content": "야",
                    "imgContent": null,
                    "chkFirstMsg": "N",
                    "displayTime": "Y",
                    "createdTime": "2020-06-01 08:21:00"
                }
            ]
        }
    ],

    roomList() {
        return new Promise(res => {
            this.data.sort(function(a, b) {
                a = new Date(a['updatedTime']);
                b = new Date(b['updatedTime']);
                
                return (a > b) ? -1 : ((a < b) ? 1 : 0);
            });

            const totalRoomLen = this.data.length;

            for(let i=0; i<totalRoomLen; i++) {
                let totalMsgLen = this.data[i]['roomInfo'].length;
                let cnt = 0;
                let roomInfo = this.data[i]['roomInfo'];
        
                for(let j=totalMsgLen-1; j>=0; j--) {
                    if(roomInfo[j]['isRead'] === 'N' && roomInfo[j]['chkMyContent'] === 'N') {
                        cnt++;
                    } else break;
                }

                this.data[i]['unreadMsgCnt'] = cnt;
            }

            res(this.data)
        })
    },

    chatList(roomId) {
        // return new Promise(res => {
            const returnData = [];
            const localImgList = this.getLocalImg();
            const chatList = this.data.filter(item => parseInt(item.roomId) === parseInt(roomId))[0];

            if(chatList['unreadMsgCnt']) {
                const totalMsgLen = chatList['roomInfo'].length;
        
                for(let i=totalMsgLen-1; i>=0; i--) {
                    if(chatList['roomInfo'][i]['chkMyContent'] === 'N' && chatList['roomInfo'][i]['isRead'] === 'N') {

                        chatList['roomInfo'][i]['isRead'] = 'Y';
                        break;
                    }
                }
            }
            
            returnData.push(localImgList);
            returnData.push(chatList);
            // res(returnData);
            return returnData;
        // })
    },
    getLocalImg() {
        const localImgList = [];
        localImgList.push(require('../assets/images/basic.png'));
        localImgList.push(require('../assets/images/sm.png'));
        localImgList.push(require('../assets/images/sh.png'));
        localImgList.push(require('../assets/images/basic.png'));
        localImgList.push(require('../assets/images/basic.png'));
        localImgList.push(require('../assets/images/sm.png'));
        localImgList.push(require('../assets/images/sh.png'));
        localImgList.push(require('../assets/images/basic.png'));
        localImgList.push(require('../assets/images/basic.png'));
        localImgList.push(require('../assets/images/sm.png'));
        localImgList.push(require('../assets/images/sh.png'));
        localImgList.push(require('../assets/images/basic.png'));

        return localImgList;
    },
    sendMsg(params) {

        const roomId = params.roomId;
        const content = params.content.trim();
        const imgContent = params.imgContent;

        if(!content && !imgContent) return;

        const chatList = this.data.filter(item => parseInt(item.roomId) === parseInt(roomId))[0];
        const idx = chatList['roomInfo'].length;

        chatList['updatedTime'] = moment().format('YYYY-MM-DD hh:mm:ss');
        chatList['currentMsg'] = content;

        let insertParams = {};
 
        insertParams.id = idx+1;
        insertParams.userName = (params.userName) ?? '진혁';
        insertParams.chkMyContent = (params.userName) ? 'N' : 'Y';
        insertParams.isRead = 'N';
        insertParams.content = content;
        insertParams.imgContent = imgContent;
        insertParams.chkFirstMsg = (moment(chatList['roomInfo'][chatList['roomInfo'].length-1]['createdTime']).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) ? 'N' : 'Y';
        insertParams.displayTime = 'Y';
        insertParams.createdTime = moment().format('YYYY-MM-DD hh:mm:ss');
        this.chkSendTime(chatList['roomInfo'][chatList['roomInfo'].length-1], insertParams).then(data => {
            console.log(data);
        });
        
        chatList['roomInfo'].push(insertParams);
        
        console.log(chatList);
    },

    chkSendTime(currentMsg, newMsg) {
        return new Promise(res => {
            let flag = false;

            if(currentMsg['chkMyContent'] === newMsg['chkMyContent']) flag = true;
            if(flag && moment(currentMsg['createdTime']).format('YYYY-MM-DD hh:mm') === moment(newMsg['createdTime']).format('YYYY-MM-DD hh:mm')) flag = true;
            else flag = false;

            if(flag) currentMsg['displayTime'] = 'N';
            res();
        });

    },

}
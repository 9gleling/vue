# basic vuejs SPA

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## 개발 환경
-vue/cli 4.4.1

-vue router로 SPA 구현

-src/models/dataModels.js 서버대신 사용하는 메소드(로직 및 기본 json data )

-웹 구현으로 크롬 개발자 도구의 모바일모드(Toggle device toolbar)로 확인

## 기본 기능

### 기능 리스트
- 1. router 
  - 목록: /list 
  - 채팅방: /room/{id}
- 2. 목록
  - 최근 메세지 순 정렬
  - 읽지 않은 메세지 수, 전송시간 출력
- 3. 채팅방
  - 메세지 등록시간 출력 hh:mm
    - 한 사람이 같은 시간에 채팅메세지를 연속해서 보낸다면 마지막 채팅메세지만 시간이 출력
  - 날짜가 바뀌면 날짜 구분선이 삽입
  - 사진 전송 기능


## 추가 설명
- 채팅 수신
  - 승민이한테 5초마다 술마시자는 메시지 옴
  - 읽은 메세지는 실제 리스트에서 클릭 시 존재하는 메세지만 읽음 처리
  - 대화 시 내 메세지의 답장으로 오는 메시지 읽음 처리 x (서버 구현 x), 리스트로 갔다가 채팅방입장 시 읽음 처리 및 내가 메세지 보내면 읽음 처리
- 채팅방 내 우측 상단 사진 첨부 기능
  - 좌측 첫번째: input file 을 이용한 사진 첨부 
  - 좌측 두번째: 로컬 이미지 라이브러리를 불러온다는 가정으로 사진 첨부 구현

## 이후 진행 예정
- nodejs(express)와 vue 번들링

- vuex를 이용한 상태 관리

- socket을 이용한 실제 채팅 구현

- 마크업 및 스타일 수정

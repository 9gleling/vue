
# vuex
- npm install vuex

- 데이터 중앙 관리(상태관리패턴)

- - helper(mapState, mapMutations ...) 사용 o
## 정리
- 1. 기본 구조
  - state: vue의 data의 개념과 비슷
  - getters: vue의 computed와 비슷(캐싱)
  - mutations: state를 동기적으로 수정할 때 사용
    - 함수명은 대문자
      - SET_DATA(state, params) {}
    - 함수명을 변수로 사용 가능(Object Dynamic Property - 동적 속성)
      - export const SET_DATA = 'SET_DATA';   // export를 붙여 모듈화 가능(다른 파일에서 사용 가능)
      - [SET_DATA](state, params) {}
  - actions: 비동기를 사용할때(ex: axios), 여러 mutation을 연결하여 실행
- 2. vuex는 redux와 다르게 여러개의 store를 나누어 사용 가능
  - ex)
    - src/store/modules/store1.js
    - src/store/modules/store2.js
    - 여러개의 stroe를 modules로 묶어줌
      `src/store/index.js`
      ```
      modules: {
        store1,
        store2,
      },
      ```


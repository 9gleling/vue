import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import List from '@/components/ListComponent'
import Room from '@/components/RoomComponent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
        path: '/',
        name: 'List',
        component: List,
        props: true,
    },
    {
        path: '/list',
        name: 'List',
        component: List,
        props: true,
    },
    {
        path: '/room/:Id',
        name: 'Room',
        component: Room
    },
    
  ],
  // scrollBehaviour() { 
  //   return { x: 0, y: 700 } 
  // }
})

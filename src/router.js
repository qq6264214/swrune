import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Rune from '@/components/Rune'
import Artifact from '@/components/Artifact'
import home from '@/components/Home'
import Rta from '@/components/Rta'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    {
    path: '/',
    component: resolve => require(['./components/Home.vue'], resolve),
    redirect: 'rune',
    meta: { title: 'home' },
    children:[
        { path: '/rune', meta: '符文筛选', component: resolve => require(['./components/Rune.vue'], resolve), },
        { path: '/artifact', meta: '神器筛选', component: resolve => require(['./components/Artifact.vue'], resolve), },
        { path: '/rta', meta: 'RTA相关', component: resolve => require(['./components/Rta.vue'], resolve), },  
      ]

    }
       
  ]
})
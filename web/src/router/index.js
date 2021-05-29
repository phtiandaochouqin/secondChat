import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */

export const constantRoutes = [
  {
    path:'/addsendfriend/:_id',
    component:()=> import('@/views/AddSendFriend'),
    props:true,
  },
  {
    path:'/friendinfo/:_id',
    component:()=> import('@/views/FriendInfo'),
    props:true
  },
  {
    path:'/login',
    component:()=> import('@/views/Login')
  },
  {
    path:'/loginup',
    component:() => import('@/views/LoginUp')
  },
 {
   path:'/home',
   component:() => import('@/views/Home')
 },
 {
   path:'/friend',
   component:() => import('@/views/Friend')
 },
 {
   path:'/testt',
   component:() => import('@/views/testt')
 },
 {
   path:'/eachother/:_id',
   component:() =>import('@/views/eachother'),
   props:true
 },
 {
  path:'/search',
  component:() => import('@/views/search'),
  name:'search'
},
{
  path:'/information',
  component:() => import('@/views/Information')
},
{
  path:'/tryaddlist',
  component:() => import('@/views/TryAddList')

}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

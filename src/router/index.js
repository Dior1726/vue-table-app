import VueRouter from 'vue-router';
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'

const router = new VueRouter({
  routes: [
  { 
    path: '/', 
    redirect: 'login',
    component: MainLayout,
    children: [
      {
        path: 'home',
        component: () => import('../pages/MainPage')
      }
    ],
    meta: {
      isAuth: true
    }
  },
  { 
    path: '/login', 
    component: AuthLayout,
    children: [
      {
        path: '',
        component: () => import('../pages/LoginPage')
      }
    ]
  }
],
  mode: 'history'
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router';
import Router from 'vue-router'
import App from "../App.vue";
import Login from "../components/login/login.vue";

//一下组件处理成异步组件
const Home = () => import("../components/home/home.vue");
const Users = () => import("../components/users/Users.vue");
const Roles = () => import("../components/roles/Roles.vue");
const Rights = () => import("../components/rights/Rights.vue");
const Categories = () => import("../components/categories/Categories.vue");
const Goods = () => import("../components/goods/Goods.vue");
const GoodsAdd = () => import("../components/goods/Goods-add.vue");
const Params = () => import("../components/params/Params.vue")
const Orders = () => import("../components/orders/Orders.vue")
const Reports = () => import("../components/reports/Reports.vue")

Vue.use(Router)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'app',
    component: App,
    redirect: '/home'
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '/users/:page?',
      component: Users
    }, {
      path: '/roles',
      component: Roles
    }, {
      path: '/rights',
      component: Rights
    }, {
      path: '/categories',
      component: Categories
    }, {
      path: '/goods',
      component: Goods
    }, {
      path: '/goods-add',
      component: GoodsAdd
    }, {
      path: '/params',
      component: Params
    }, {
      path: '/orders',
      component: Orders
    }, {
      path: '/reports',
      component: Reports
    }],
  }]
})

//使用导航守卫, 确保不能在未登录的情况下访问其他页面
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    //判断用户是否登录
    const token = localStorage.getItem("token")
    token ? next() : next("/login")
  }
})


export default router

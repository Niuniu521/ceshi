import Vue from "vue"
import Router from "vue-router"
import index from "../pages/Index.vue"
import Login from "../pages/Login.vue"
import Home from "../pages/Home.vue"
import Order from "../pages/Order.vue"
import Me from "../pages/Me.vue"

Vue.use(Router)

const router =new Router({
  mode:'history',
  routes:[
    {
      path:"/",
      // name:"index",
      component:index,
      children:[
        {
          path:"",
          redirect:"/home",
        },
        {
          path:"/home",
          name:"home",
          component:Home
        },
        {
          path:"/order",
          name:"order",
          component:Order
        },
        {
          path:"/me",
          name:"me",
          component:Me
        }
      ]
    },
    {
      path:"/login",
      name:"login",
      component:Login
    }
    
  ]
});

router.beforeEach((to,from,next) => {
  const isLogin = localStorage.ele_login ? true: false;
  if(to.path=="/login"){
    next();
  }else{
    isLogin ? next():next("/login");
  }
})


export default router;
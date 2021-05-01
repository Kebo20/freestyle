import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/products.vue')
  },


  {
    path: '/admin',
    name: 'Admin',
    // component: () => import('../views/Admin/Index.vue'),
    redirect:'/admin/index',
    component: {
      render(c) { return c('router-view') }
    },
    beforeEnter: (to, from, next) => {
      let token = store.state.token
      if (token != '') {
        next()
      } else {
        next("/login")
      }

    },

    children: [
      {
        path: 'index',
        name: 'AdminIndex',
        component: () => import('../views/Admin/Index.vue'),

      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('../views/Admin/Categories.vue'),

      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/Admin/Products.vue'),

      },
    ]
  },



  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/Logout.vue')
  },
]

const router = new VueRouter({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  routes
})


//VALIDAR SESIÓN EN RUTAS
// router.beforeEach((to, from, next) => {
// let token = store.state.token


// if (token != '') { //Existe token


//   if (to.path == '/login') {
//     next('/admin')
//   }

//   if (to.path == '/admin/products') {
//     next('')
//   }



// } else {
//   if (to.path == '/login') {
//     next()
//   }

//   if (to.path == '/admin/products') {
//     next('/login')
//   }



//   if (to.path == '/login') {
//     next()
//   }

//   if (to.path == '/admin/products') {
//     next('/login')
//   }


// }


// })


export default router

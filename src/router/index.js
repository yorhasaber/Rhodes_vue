import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../views/Manage.vue'),
        redirect: "/home",
        // redirect: "/login",
        children: [
            {path: 'home', name: '首页', component: () => import('../views/Home.vue')},
            {path: 'user', name: '用户管理', component: () => import('../views/User.vue')},
            {path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
            {path: 'file', name: '文件管理', component: () => import('../views/File.vue')},
            {path: 'Password', name: '修改密码', component: () => import('../views/Password')},

            {path: 'Goods', name: '舰内报修', component: () => import('../views/Goods')},
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register')
    },
    {path: '*', name: '404', component: () => import('../views/404')},
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
    store.commit("setPath")  // 触发store的数据更新
    next()  // 放行路由
})

router.beforeEach((to, from, next) => {
    // next('/login')
    //如果用户访问的是登录页面，则直接放行
    if (to.path === '/login') {
        next()
        console.log(111);
    } else {
        //从本地缓存中获取保存的 token 值（这里实用的是 localStorage ）
        const tokenStr = JSON.parse(localStorage.getItem('user'));
        console.log(tokenStr);
        // const tokenStr2=tokenStr.token;
        console.log("3");
        // const tokenStr = window.localStorage.getItem('user')
        // console.log(tokenStr.token);
        //如果无token，就强制跳转到登录页面，如果有，则直接放行
        if (tokenStr === null) {
            next('/login')
            alert('未登录，无法查看')
            console.log(111);
        } else {
            console.log("已经识别token,允许登录");
            next()
        }
    }
})


export default router

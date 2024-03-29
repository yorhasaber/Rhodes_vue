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
            {path: 'role', name: '角色管理', component: () => import('../views/Role.vue')},
            {path: 'menu', name: '菜单管理', component: () => import('../views/Menu.vue')},
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
    {
        path: '/404',
        name: '404',
        component: () => import('../views/404.vue')
    },
    //*此方式在有动态路由的情况下会出现问题
    // {path: '*', name: '404', component: () => import('../views/404')},
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


// 提供一个重置路由的方法
export const resetRouter = () => {
    router.matcher = new VueRouter({
        mode: 'history',
        base: process.env.BASE_URL,
        routes
    })
}

// 注意：刷新页面会导致页面路由重置
export const setRoutes = () => {
    const storeMenus = localStorage.getItem("menus");
    if (storeMenus) {

        // 获取当前的路由对象名称数组
        const currentRouteNames = router.getRoutes().map(v => v.name)
        if (!currentRouteNames.includes('Manage')) {
            // 拼装动态路由
            const manageRoute = {
                path: '/',
                name: 'Manage',
                component: () => import('../views/Manage.vue'),
                redirect: "/home",
                children: [
                    {path: 'person', name: '个人信息', component: () => import('../views/Person.vue')},
                    {path: 'password', name: '修改密码', component: () => import('../views/Password.vue')},
                ]
            }
            const menus = JSON.parse(storeMenus)
            menus.forEach(item => {
                if (item.path) {  // 当且仅当path不为空的时候才去设置路由
                    let itemMenu = {
                        path: item.path.replace("/", ""),
                        name: item.name,
                        component: () => import('../views/' + item.pagePath + '.vue')
                    }
                    manageRoute.children.push(itemMenu)
                } else if (item.children.length) {
                    item.children.forEach(item => {
                        if (item.path) {
                            let itemMenu = {
                                path: item.path.replace("/", ""),
                                name: item.name,
                                component: () => import('../views/' + item.pagePath + '.vue')
                            }
                            manageRoute.children.push(itemMenu)
                        }
                    })
                }
            })

            // 动态添加到现在的路由对象中去
            router.addRoute(manageRoute)

        }
    }
}

// 重置我就再set一次路由
setRoutes()

//路由守卫
router.beforeEach((to, from, next) => {
    localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称
    store.commit("setPath")

    // 未找到路由的情况
    if (!to.matched.length) {
        const storeMenus = localStorage.getItem("menus")
        if (storeMenus) {
            next("/404")
        } else {
            // 跳回登录页面
            next("/login")
        }

    }
    // 其他的情况都放行
    next()
}
)

// router.beforeEach((to, from, next) => {
//     // next('/login')
//     //如果用户访问的是登录页面，则直接放行
//     if (to.path === '/login') {
//         next()
//         console.log(111);
//     } else {
//         //从本地缓存中获取保存的 token 值（这里实用的是 localStorage ）
//         const tokenStr = JSON.parse(localStorage.getItem('user'));
//         console.log(tokenStr);
//         // const tokenStr2=tokenStr.token;
//         console.log("3");
//         // const tokenStr = window.localStorage.getItem('user')
//         // console.log(tokenStr.token);
//         //如果无token，就强制跳转到登录页面，如果有，则直接放行
//         if (tokenStr === null) {
//             next('/login')
//             alert('未登录，无法查看')
//             console.log(111);
//         } else {
//             console.log("已经识别token,允许登录");
//             next()
//         }
//     }
// })


export default router

import { createRouter, createWebHashHistory } from 'vue-router';
import { ElNotification } from 'element-plus';
import config from "@/config"
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import tool from '@/utils/tool';
import systemRouter from './systemRouter';
// import userRoutes from '@/config/route';
import asyncRoutes from "./routers"
import { beforeEach, afterEach } from './scrollBehavior';
// import store from '@/store'

//系统路由
const routes = systemRouter

//系统特殊路由
// const routes_404 = {
//     path: "/:pathMatch(.*)*",
//     hidden: true,
//     component: () => import(/* webpackChunkName: "404" */ '@/layout/other/404'),
// }
// let routes_404_r = () => { }

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

//设置标题
document.title = config.APP_NAME

//判断是否已加载过动态/静态路由

// var isGetRouter = store.state.authorityies.menus.length ? true : false;
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    //动态标题
    document.title = to.meta.title ? `${to.meta.title} - ${config.APP_NAME}` : `${config.APP_NAME}`
    let apiMenu = asyncRoutes || []
    //整页路由处理
    if (to.meta.fullpage) {
        to.matched = [to.matched[to.matched.length - 1]]
    }
    // TODO: authorityId替换成userInfo中的数据
    var menuRouter = filterAsyncRouter(apiMenu)
    menuRouter = flatAsyncRoutes(menuRouter)
    menuRouter.forEach(item => {
        router.addRoute("layout", item)
    })
    // routes_404_r = router.addRoute(routes_404)
    if (to.matched.length == 0) {
        router.push(to.fullPath);
    }
    NProgress.done()
    beforeEach(to, from)
    next();
});

router.afterEach((to, from) => {
    afterEach(to, from)
    NProgress.done()
});

router.onError((error) => {
    NProgress.done();
    ElNotification.error({
        title: '路由错误',
        message: error.message
    });
});

//入侵追加自定义方法、对象
router.sc_getMenu = () => {
    var apiMenu = asyncRoutes || []
    var menu = [...apiMenu]
    return menu
}

//转换
function filterAsyncRouter(routerMap) {
    const accessedRouters = []
    routerMap.forEach(item => {
        item.meta = item.meta ? item.meta : {};
        //处理外部链接特殊路由
        if (item.meta.type == 'iframe') {
            item.meta.url = item.path;
            item.path = `/i/${item.name}`;
        }
        //MAP转路由对象
        var route = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            redirect: item.redirect,
            children: item.children ? filterAsyncRouter(item.children) : null,
            component: loadComponent(item.component)
        }
        accessedRouters.push(route)
    })
    return accessedRouters
}
function loadComponent(component) {
    if (component) {
        return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}`)
    } else {
        return () => import(`@/layout/other/empty`)
    }

}

//路由扁平化
function flatAsyncRoutes(routes, breadcrumb = []) {
    let res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (tmp.children) {
            let childrenBreadcrumb = [...breadcrumb]
            childrenBreadcrumb.push(route)
            let tmpRoute = { ...route }
            tmpRoute.meta.breadcrumb = childrenBreadcrumb
            delete tmpRoute.children
            res.push(tmpRoute)
            let childrenRoutes = flatAsyncRoutes(tmp.children, childrenBreadcrumb)
            childrenRoutes.map(item => {
                res.push(item)
            })
        } else {
            let tmpBreadcrumb = [...breadcrumb]
            tmpBreadcrumb.push(tmp)
            tmp.meta.breadcrumb = tmpBreadcrumb
            res.push(tmp)
        }
    })
    console.log('resres', res)
    return res
}


export default router

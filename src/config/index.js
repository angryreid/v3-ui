const DEFAULT_CONFIG = {
    //标题
    APP_NAME: "BlackShark",

    //localstorage菜单key名称
    MENU_NAME:'DEMO_MENUS',

    //首页地址
    DASHBOARD_URL: "/demo",

    //版本号
    APP_VER: "0.0.1",

    //内核版本号
    CORE_VER: "1.4.1",

    //接口地址
    API_URL: "/api",

    BASE_URL: {
        // dev: 'http://10.0.64.180:8888',
        dev: 'http://10.0.12.239:8888/',
        pro: '/'
    },

    // 默认打开的首页的路由name值，默认为home
    homeName: 'developer_manage',

    // appId
    APP_ID: '20210001',

    //请求超时
    TIMEOUT: 10000,

    //TokenName
    TOKEN_NAME: "x-token",

    //Token前缀，注意最后有个空格，如不需要需设置空字符串
    TOKEN_PREFIX: "",

    //追加其他头
    HEADERS: {},

    //请求是否开启缓存
    REQUEST_CACHE: false,

    //布局 默认：default | 通栏：header | 经典：menu | 功能坞：dock
    //dock将关闭标签和面包屑栏
    LAYOUT: 'default',

    //菜单是否折叠
    MENU_IS_COLLAPSE: false,

    //菜单是否启用手风琴效果
    MENU_UNIQUE_OPENED: false,

    //是否开启多标签
    LAYOUT_TAGS: true,

    //语言
    LANG: 'zh-cn',

    //主题颜色
    COLOR: '',

    //控制台首页默认布局
    DEFAULT_GRID: {
        //默认分栏数量和宽度 例如 [24] [18,6] [8,8,8] [6,12,6]
        layout: [12, 6, 6],
        //小组件分布，com取值:views/home/components 文件名
        copmsList: [
            ['welcome'],
            ['about', 'ver'],
            ['time', 'progress']
        ]
    }
}

// 如果生产模式，就合并动态的APP_CONFIG
// public/config.js
if (process.env.NODE_ENV === 'production') {
    Object.assign(DEFAULT_CONFIG, APP_CONFIG)
}

module.exports = DEFAULT_CONFIG

module.exports = {
    title: "JavaExing", // 网站标题
    description: 'vitepress 体验.', //网站描述
    base: '/', //  部署时的路径 默认 /  可以使用二级地址 /base/
    lang: 'zh-CN', //语言
    repo: 'small-universe/vitepress-java', // 仓库设置
    head: [
        // 改变title的图标
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.png', //图片放在public文件夹下
            },
        ],
    ],
    // 主题配置
    themeConfig: {
        logo: '/fenix.png',

        editLinks: true,
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',

        // 搜索
        algolia: {
            apiKey: process.env.ALGOLIA_API_KEY,
            indexName: process.env.ALGOLIA_INDEX_NAME
        },

        //   头部导航
        nav: [{
                text: '首页',
                link: '/'
            },
            {
                text: '导航',
                link: '/java/'
            },
        ],
        //   侧边导航
        sidebar: [{
            text: 'Java',
            link: '/java/'
        }]
    }
}
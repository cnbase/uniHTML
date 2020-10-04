/**
 * admin模块页面
 */
const path = 'src/uniHTML/uni_default/admin';
const pages = {
    index:{
        entry:path+'/index/index.js',
        filename:'index.html', //相对于outputDir
        title:'管理后台',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    login:{
        entry:path+'/login/login.js',
        filename:'login.html', //相对于outputDir
        title:'登录管理后台',
        chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    home:{
        entry:path+'/home/home.js',
        filename:'home.html', //相对于outputDir
        title:'管理主页',
        chunks: ['chunk-vendors', 'chunk-common', 'home']
    },
    menu:{
        entry:path+'/menu/menu.js',
        filename:'menu.html', //相对于outputDir
        title:'管理菜单',
        chunks: ['chunk-vendors', 'chunk-common', 'menu']
    }
}

module.exports = pages;
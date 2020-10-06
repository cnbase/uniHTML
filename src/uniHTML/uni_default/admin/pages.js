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
    },
    auth:{
        entry:path+'/auth/auth.js',
        filename:'auth.html', //相对于outputDir
        title:'管理权限',
        chunks: ['chunk-vendors', 'chunk-common', 'auth']
    },
    role:{
        entry:path+'/role/role.js',
        filename:'role.html', //相对于outputDir
        title:'管理角色',
        chunks: ['chunk-vendors', 'chunk-common', 'role']
    },
    role_auth:{
        entry:path+'/role_auth/role_auth.js',
        filename:'role_auth.html', //相对于outputDir
        title:'分配权限',
        chunks: ['chunk-vendors', 'chunk-common', 'role_auth']
    },
    role_menu:{
        entry:path+'/role_menu/role_menu.js',
        filename:'role_menu.html', //相对于outputDir
        title:'分配菜单',
        chunks: ['chunk-vendors', 'chunk-common', 'role_menu']
    },
    user:{
        entry:path+'/user/user.js',
        filename:'user.html', //相对于outputDir
        title:'用户管理',
        chunks: ['chunk-vendors', 'chunk-common', 'user']
    }
}

module.exports = pages;
const apiData = {
    "/change_password":{
        "code": 0,
        "data": {},
        "msg": "修改成功"
    },
    "/check_login":{
        "code": 0,
        "data": {},
        "msg": "已登录"
    },
    "/index":{
        "code": 0,
        "data": {
            "user": {
                "username": "Qbit",
                "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            },
            "menus": [
                {
                    "id": 8,
                    "title": "主页",
                    "url": "/home.html",
                    "icon": "el-icon-monitor",
                    "children": []
                },
                {
                    "id": 2,
                    "title": "一级菜单",
                    "url": "/home.html",
                    "icon": "el-icon-umbrella",
                    "children": [
                        {
                            "id": 3,
                            "title": "二级菜单",
                            "url": "/home.html",
                            "icon": "el-icon-pie-chart",
                            "children": [
                                {
                                    "id": 4,
                                    "title": "三级菜单",
                                    "url": "/home.html",
                                    "icon": "el-icon-platform-eleme",
                                    "children": []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "msg": ""
    },
    "/login":{
        "code": 0,
        "data": {
            "token": "RandomToken"
        },
        "msg": "登录成功"
    },
    "/logout":{
        "code": 0,
        "data": {},
        "msg": "已退出"
    }
}

module.exports = apiData;
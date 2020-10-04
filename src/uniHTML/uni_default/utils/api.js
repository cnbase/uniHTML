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
    },
    "/menu": {
        "code": 0,
        "data": {
            menus: [
                {
                    id: 1,
                    title: '2016-05-02',
                    icon:'el-icon-trophy',
                    status_text: '王小虎',
                    url: '上海市普陀区金沙江路 1518 弄',
                    sort_no: 0,
                    status:0,
                    pre_ids:[],
                },
                {
                    id: 2,
                    title: '2016-05-04',
                    icon:'el-icon-trophy',
                    status_text: '王小虎',
                    url: '上海市普陀区金沙江路 1517 弄',
                    sort_no: 0,
                    status:0,
                    pre_ids:[],
                },
                {
                    id: 3,
                    title: '2016-05-01',
                    icon:'el-icon-trophy',
                    status_text: '王小虎',
                    url: '上海市普陀区金沙江路 1519 弄',
                    sort_no: 0,
                    status:0,
                    pre_ids:[],
                    children: [{
                        id: 31,
                        title: '2016-05-01',
                        icon:'el-icon-trophy',
                        status_text: '王小虎',
                        url: '上海市普陀区金沙江路 1519 弄',
                        sort_no: 0,
                        status:0,
                        pre_ids:[],
                    }, {
                        id: 32,
                        title: '2016-05-01',
                        icon:'el-icon-trophy',
                        status_text: '王小虎',
                        url: '上海市普陀区金沙江路 1519 弄',
                        sort_no: 0,
                        status:0,
                        pre_ids:[3,32],
                    }]
                },
                {
                    id: 4,
                    title: '2016-05-03',
                    icon:'el-icon-trophy',
                    status_text: '王小虎',
                    url: '上海市普陀区金沙江路 1516 弄',
                    sort_no: 0,
                    status:0,
                    pre_ids:[],
                }]
        },
        "msg": "成功"
    },
    "/edit_menu":{
        "code": 0,
        "data": {},
        "msg": "操作成功"
    },
    "/remove_menu":{
        "code": 0,
        "data": {},
        "msg": "操作成功"
    },
}

module.exports = apiData;
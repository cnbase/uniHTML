import Api from "@/uniCore/api";
import Token from "@/utils/token";
import Config from "@/config";

/**
 * 执行登录
 * @param data
 */
const login = function (data){
    return new Promise(function (resolve, reject) {
        let tokenPrefix = Token.getTokenPrefix();
        if (!tokenPrefix){
            resolve({code:5001,data:{},msg:'请刷新页面重试'});
        }
        //执行登录
        if (Config.devMode){
            //开发模式，直接返回成功
            if (data.password === 'admin'){
                //写入缓存
                Token.writeToken('admin');
                resolve({code:0,data:{},msg:'登录成功'});
            } else {
                resolve({code:5002,data:{},msg:'密码错误'});
            }
        } else {
            Api.post(Config.getApiUrl('/login'),data).then(function (res){
                if (res.code === 0){
                    //写入缓存
                    Token.writeToken(res.data.token);
                }
                resolve(res);
            }).catch(function (error){
                reject(error);
            })
        }
    })
}

/**
 * 检测token合法性，判断是否登录
 */
const checkLogin = function (){
    return new Promise(function (resolve, reject) {
        let token = Token.getToken();
        if (!token){
            resolve({code:5001,data:{},msg:'5001-请先登录'});
        } else {
            //校验token
            if (Config.devMode){
                //开发模式 - 不去判断密码了
                resolve({code:0,data:{},msg:'通过'});
            } else {
                Api.post(Config.getApiUrl('/check_login'),{token:token}).then(function (res){
                    resolve(res);
                }).catch(function (error){
                    reject(error);
                })
            }
        }
    })
}

export default {
    login,
    checkLogin
}
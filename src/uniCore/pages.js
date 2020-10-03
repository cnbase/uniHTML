let uniConfig = require('../config')

/**
 * 模块 页面配置文件
 * @type {string}
 */
const pagesPath = '../uniHTML/'+uniConfig.uniName+'/'+uniConfig.moduleName+'/pages';

/**
 * 载入模块页面配置
 */
const pages = require(pagesPath);

/**
 * 单页面构建
 */
const getModulePage = function () {
    return {
        pages:{
            [`${uniConfig.pageName}`]:pages[`${uniConfig.pageName}`]
        },
    };
}

/**
 * 模块全页面构建
 * @returns {{pages: *}}
 */
const getModulePages = function (){
    return {
        pages:pages,
    };
}

module.exports = {
    getModulePage,
    getModulePages
};
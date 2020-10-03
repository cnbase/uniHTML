/**
 * 开发模式
 * @type {boolean}
 */
const devMode = true;

/**
 * 开发模式下，直接读取该 api 文件数据
 */
// const apiData = require('./uniHTML/uni_default/utils/api');
/**
 * 正式环境
 */
const apiData = {};

/**
 * 模块访问url
 * @type {string}
 */
const baseUrl = '';

/**
 * 服务器API地址
 * @type {string}
 */
const apiUrl = '';

/**
 * 第三方模板名称
 * @type {string}
 */
const uniName = 'uni_default';

/**
 * 应用模块名称
 * @type {string}
 */
const moduleName = 'index';

/**
 * 构建目录，相对vue.config.js目录
 * @type {string}
 */
const outputDir = './www/admin';

/**
 * 静态目录，相对于outputDir
 * @type {string}
 */
const assetsDir = 'static';

/**
 * 打包模式
 * true:全量打包
 * false:按需打包
 * @type {boolean}
 */
const babelMode = false;

/**
 * 构建方式
 * 注意：每次打包都会删除原构建目录所有文件重新打包
 * true:全页面构建，打包全部文件
 * false:单页面构建，单独打包
 * @type {boolean}
 */
const buildMode = true;

/**
 * 单页面构建时，页面名称
 * @type {string}
 */
const pageName = 'index';

/**
 * 组装 api url
 * @param api
 * @returns {string}
 */
const getApiUrl = function (api) {
    return apiUrl+api;
}

/**
 * 获取页面url
 * @param url
 * @returns {string}
 */
const getPageUrl = function (url) {
    return baseUrl+url;
}

module.exports = {
    devMode,
    apiData,
    uniName,
    outputDir,
    assetsDir,
    moduleName,
    pageName,
    babelMode,
    buildMode,
    getApiUrl,
    getPageUrl,
}
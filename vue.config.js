let uniConfig = require('./src/config')
let pages = require('./src/uniCore/pages')

/**
 * 构建方式
 * 注意：每次打包都会删除原构建目录所有文件重新打包
 * true:全页面构建，打包全部文件
 * false:单页面构建，单独打包
 * @type {boolean}
 */
const buildMode = uniConfig.buildMode;

let vueConfig = {
    outputDir:uniConfig.outputDir,
    assetsDir:uniConfig.assetsDir,
};

if (buildMode){
    //全页面打包
    vueConfig = {...vueConfig,...pages.getModulePages()};
} else {
    //单页面打包
    vueConfig = {...vueConfig,...pages.getModulePage()};
}

module.exports = {
    ...vueConfig
}
const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {
    // 为antd-mobile设置按需加载css
    config = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
    // 为redux配置装饰器
    config = injectBabelPlugin('babel-plugin-transform-decorators-legacy', config);
    return config;
};
// 参考文档：https://segmentfault.com/a/1190000015301231
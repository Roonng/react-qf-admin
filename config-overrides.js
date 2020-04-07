//基于customize 和 react-app-rewired的定制化配置
const { 
    override,
    addLessLoader,
    fixBabelImports
   } = require('customize-cra')
  
  module.exports = override(
    addLessLoader({
      javascriptEnabled: true
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
  )
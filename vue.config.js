const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@SERVICES', resolve(__dirname, 'src', 'services'))
      .set('@COMPONENTS', resolve(__dirname, 'src', 'components'))
      .set('@data', resolve(__dirname, 'src', 'data'))
      .set('@VIEWS', resolve('src', 'views'))
      .set('@HELPERS', resolve('src', 'helpers'))
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PACKAGE_VERSION' : '"' + version + '"',
        'process.env.ID_SISTEMA' : 15
        
      })
    ]
  },
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: {
      '^/integrador-web': {
        target: 'https://staging.pullman.cl',
        ws: true,
        changeOrigin: true
      },
      '^/administracion-web': {
        target: 'http://128.1.0.137:8080',
        ws: true,
        changeOrigin: true
      },
      '^/srv-privado-web': {
        target: 'https://staging.pullman.cl',
        ws: true,
        changeOrigin: true
      }
    }
  }
}

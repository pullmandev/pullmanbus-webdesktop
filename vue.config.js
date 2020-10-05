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
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PACKAGE_VERSION: '"' + version + '"'
        }
      })
    ]
  },
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy : {
      "^/integrador-web": {
      target: 'http://localhost:8080',
      ws: true,
      changeOrigin: true
      },
      "^/administracion-web": {
      target: 'http://qa.pullman.cl',
      ws: true,
      changeOrigin: true
      },
      "^/srv-privado-web": {
      target: 'http://qa.pullman.cl',
      ws: true,
      changeOrigin: true
      }
    }
  }
}

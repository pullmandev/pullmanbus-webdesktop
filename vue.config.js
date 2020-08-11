const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
const webpack = require('webpack')
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set(
      '@SERVICES',
      path.resolve(__dirname, 'src/services')
    )
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
  transpileDependencies: ['vuetify']
}

const fs   = require('fs')
const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // mutate config for production...
    } else {
      // mutate for development...
    }
    config.devtool = 'hidden-source-map';
    config.output = {
      hashFunction: 'xxhash64',
      path: path.join(__dirname, 'dist'),
      filename: 'stock-front.[contenthash:8].js',
      publicPath: '/',
      chunkFilename: 'stock-front.[contenthash:8].js'
    }
    config.resolve = {
      alias: {
        '@': path.join(__dirname, 'src'),
        'vue$': 'vue/dist/vue.runtime.esm-bundler.js',
        'assets' : path.resolve(__dirname, 'src/assets'),
      },
      extensions: [ '.mjs', '.js', '.jsx', '.vue', '.json', '.wasm' ],
      modules: [
        'node_modules',
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'node_modules/@vue/cli-service/node_modules'),
      ]
    }
    config.externals = {
      // 이곳의 선언된 Json 객체는 .vue 자바스크림트에서 ${config.apiUrl}로 가져올 수 있다.
      config: JSON.stringify({
        contextRoot: ''
      })
    }
    config.devServer = {
      static: {
        directory: path.join(__dirname, 'public')
      },
      // clientLogLevel: 'warning',
      historyApiFallback: true,
      // inline: true,
      // overlay: true,
      host: 'test.hws.pe.kr',
      port: 80,
      https: false,
      proxy: {
        '/api': {
          target: 'http://localhost:18081'
        },
        '/login': {
          target: 'http://localhost:18081'
        },
        '/sns': {
          target: 'http://localhost:18081'
        }
      }
    }
  },

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

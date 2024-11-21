const webpack = require('webpack');

module.exports = {
  devServer: {
    port: 3000,
  },
  lintOnSave: false,
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'chart.js': 'chart.js/auto', // 최신 chart.js 설정에 맞게 수정
      },
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6,
      }),
    ],
  },
  pwa: {
    name: 'Vue Black Dashboard',
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675',
    workboxPluginMode: 'GenerateSW', // PWA 설정 추가
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html'],
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production',
  },
};

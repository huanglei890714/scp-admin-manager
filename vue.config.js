module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/public/'
      : '/',
    productionSourceMap: false,
    devServer: {
      port: 8081,
      proxy: {
        '^/api/v1/': {
          target: 'https://dev.cms.shechipin1.com/',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
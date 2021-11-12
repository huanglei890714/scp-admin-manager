module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/public/'
      : '/',
    productionSourceMap: false,
    devServer: {
      port: 8081,
      proxy: {
        '^/apis/v1/': {
          target: 'http://127.0.0.1:8001',
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
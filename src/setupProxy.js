const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://www.mmobomb.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api1'
    },
  }));
};
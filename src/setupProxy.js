const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware('/socket.io/', {
        target: 'ws://localhost:3000/socket.io/',
        ws: true,
        changeOrigin: true,
    })
);
};
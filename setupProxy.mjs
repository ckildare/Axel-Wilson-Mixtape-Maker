import { createProxyMiddleware } from 'http-proxy-middleware';

export default function (app) {
  app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  }));
}
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

// https://vitejs.dev/config/
export default (mode: string) => {
  const env = loadEnv(mode, process.cwd());
  const apiName = env.VITE_SERVER_CONTAINER_NAME;
  const apiPort = env.VITE_SERVER_CONTAINER_PORT;
  defineConfig({
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/vendor/[hash].js',
          entryFileNames: 'assets/js/[name].js',
        },
      },
    },
    server: {
      // host: "http://serverApp",
      host: '127.0.0.1',
      // host: true,
      port: 5173,
      strictPort: true,
      // host: "localhost",
      proxy: {
        '/api': {
          // Dockerで動いているサーバーサイド用のコンテナ名とサーバサイドアプリが待ち受けているポート
          // target: `http://${apiName}:${apiPort}`,

          // target: "http://serverApp:8085",
          // target: "http://localhost:9992",
          target: 'https://pokeapi.co/api/v2/pokemon/aa',

          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (_proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        },
        '/static': {
          target: `http://${apiName}:${apiPort}`,
        },
        '/api2': {
          target: 'https://malker-backend.onrender.com/',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api2/, ''),
        },
      },
    },
  });
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
};

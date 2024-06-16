import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default ({ _mode }) => {
  const devServerPort = process.env.VITE_SERVER_CONTAINER_PORT;
  const devServerHost = process.env.VITE_SERVER_CONTAINER_NAME;
  return defineConfig({
    plugins: [react()],
    server: {
      port: 5175,
      // host: "127.0.0.1",
      strictPort: true,
      proxy: {
        // 外部サーバー
        '/api1': {
          target: 'https://yesno.wtf/api',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api1/, ''),
        },
        // ローカルの開発環境APIサーバー
        '/api': {
          target: `http://${devServerHost}:${devServerPort}`,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      minify: true,
      outDir: 'dist',
    },
  });
};

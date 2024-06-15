import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default ({ _mode }) => {
  const devServerPort = process.env.VITE_SERVER_CONTAINER_PORT;
  if (!devServerPort) {
    console.error('no port number for local development');
    return;
  }
  return defineConfig({
    plugins: [react()],
    server: {
      port: 5175,
      // host: "127.0.0.1",
      strictPort: true,
      proxy: {
        '/api1': {
          target: 'https://yesno.wtf/api',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api1/, ''),
        },
        '/api2': {
          target: `http://serverApp:${devServerPort}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api2/, ''),
        },
      },
    },
    build: {
      minify: true,
      outDir: 'dist',
    },
  });
};

// export default defineConfig({

//   plugins: [react()],
//   server: {
//     port: 5175,
//     // host: "127.0.0.1",
//     strictPort: true,
//     proxy: {
//       '/api1': {
//         target: 'https://yesno.wtf/api',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api1/, ''),
//       },
//       '/api2': {
//         // target: 'http://serverApp:9995',
//         target: `http://serverApp:${process.env.VITE_SERVER_CONTAINER_PORT}`,
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api2/, ''),
//       },
//     },
//   },
// });

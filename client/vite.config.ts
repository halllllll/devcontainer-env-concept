import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 5175,
		// host: "127.0.0.1",
		strictPort: true,
		proxy: {
			"/api1": {
				target: "https://yesno.wtf/api",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api1/, ""),
			},
			"/api2": {
				target: "http://serverApp:8085",
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api2/, ""),
			},
		},
	},
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    server: {
        port: 3002
    },
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true
            },
            manifest: {
                name: "incluwork",
                short_name: "incluwork",
                start_url: ".",  // Changed for clarity
                display: "standalone",
                background_color: "#fff",
                description: "Job portal for Differently able people.",
                theme_color: "#ffffff",
                "icons": [
                    {
                        "src": "images/pwa-512x512.png",
                        "sizes": "168x168",
                        "type": "image/png"
                    },
                    {
                        "src": "images/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    }
                ]

            },

        })
    ],
});

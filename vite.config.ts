import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        open: false,
        host: true,
        watch: {
            usePolling: true,
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "AddressLookup",
            fileName: (format) => `address-lookup.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (assetInfo) => {
                    return assetInfo.name === "style.css" ? "address-lookup.css" : assetInfo.name;
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    optimizeDeps: {
        include: ["./src/assets/AutocompleteAddress.min.cjs"],
    },
    css: {
        postcss: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
});

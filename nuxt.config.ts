import { execSync } from "child_process";
let gitSha: string | null = null;
let version: string | null = null;
try {
  gitSha = execSync("git rev-parse HEAD").toString().trim().substring(0, 7);
  version = execSync("git log -1 --format=%cd --date=format:'%Y.%m.%d'").toString().trim();
} catch (e) {
  gitSha = "git unknown";
  version = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
}

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || "/api",
      gitSha: gitSha,
      version: version,
    },
  },

  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:4000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
  
  modules: ["@pinia/nuxt", "@vite-pwa/nuxt"],
});

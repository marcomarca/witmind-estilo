import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      resolve: {
        alias: {
          "@": resolve(__dirname, "src")
        }
      },
      build: {
        lib: {
          entry: resolve(__dirname, "src/showroom-witmind-signature.ts"),
          name: "ShowroomWitmindSignature",
          fileName: () => "showroom-witmind-signature.js",
          formats: ["es"]
        },
        rollupOptions: {
          // Bundling everything into a self-contained bundle for Home Assistant
          external: []
        },
        outDir: "dist",
        emptyOutDir: true
      }
    };
  }

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    },
    server: {
      port: 5174,
      open: false,
      watch: {
        ignored: ["**/*.zip", "**/artifacts/**", "**/reference-analysis/**"]
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          dark: resolve(__dirname, "showroom-witmind-signature.html"),
          light: resolve(__dirname, "showroom-witmind-signature-light.html"),
          lab: resolve(__dirname, "lab/index.html")
        }
      }
    }
  };
});

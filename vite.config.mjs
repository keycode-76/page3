// vite.config.mjs
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
    // base: './', // 確保打包後的相對路徑
    // build: {
    //   outDir: 'dist',
    // },
 
    base: '/page3/', 
    // 防止 Vite 在編譯時清空螢幕，這樣你就可以看到 Rust 的錯誤訊息
    clearScreen: false,

    // 嚴格使用指定的端口，如果端口不可用會導致構建失敗
    server: {
        strictPort: true,
    },

    // 允許你訪問由 Tauri CLI 設置的環境變量，這些變量包含了關於當前目標的信息，如平台、架構、調試模式等
    envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
    plugins: [
        commonjs({
            extensions: ['.js', '.ts'],
        }),
    ],

  build: {
    cssPreprocessOptions: {
          // 如果要使用SASS全域變數就在這裡設定路徑
          scss: {
           // additionalData: '@import "./styles/variable.scss";',
          },
         },
         css: {
          // 官方列為實驗性功能，可以找出是由哪個來源建構的css
          devSourceMap: true,
         },
    // 根據 Tauri 的平台選擇使用特定的瀏覽器引擎。Tauri 在 Windows 上使用 Chromium，而在 macOS 和 Linux 上使用 WebKit。
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',

    // 根據 Tauri 是否處於調試模式來決定是否進行代碼壓縮。在調試模式下，禁用壓縮以提高代碼可讀性和調試體驗。
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,


    // 根據 Tauri 是否處於調試模式來決定是否生成源代碼映射文件。在調試模式下，生成源代碼映射以便更好地進行調試。
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
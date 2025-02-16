import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
      },
      include: '**/*.svg',
    }),
  ],
  resolve: {
    alias: {
      '@assets': resolve(__dirname, './src/assets/'),
      '@components': resolve(__dirname, './src/components/'),
      '@constants': resolve(__dirname, './src/constants/'),
      '@hooks': resolve(__dirname, './src/hooks/'),
      '@layouts': resolve(__dirname, './src/layouts/'),
      '@libs': resolve(__dirname, './src/libs/'),
      '@pages': resolve(__dirname, './src/pages/'),
      '@routers': resolve(__dirname, './src/routers/'),
      '@services': resolve(__dirname, './src/services/'),
      '@styles': resolve(__dirname, './src/styles/'),
      '@types': resolve(__dirname, './src/types/'),
      '@utils': resolve(__dirname, './src/utils/'),
      '@dtos': resolve(__dirname, './src/dtos/'),
      '@apis': resolve(__dirname, './src/apis/'),
      '@stores': resolve(__dirname, './src/stores/'),
      '@mocks': resolve(__dirname, './src/mocks/'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
});

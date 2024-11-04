import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { tamaguiPlugin } from '@tamagui/vite-plugin'

const extensions = [
  '.web.js',
  '.web.jsx',
  '.web.ts',
  '.web.tsx',
  '.mjs',
  '.js',
  '.mts',
  '.ts',
  '.jsx',
  '.tsx',
  '.json',
]

export default defineConfig({
  define: {
    DEV: `${process.env.NODE_ENV === 'development' ? true : false}`,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: extensions,
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      loader: {
        '.js': 'jsx',
      },
    },
  },
  ssr: {
    noExternal: ['{design system library}', /@tamagui/],
    external: ['react-native-web'],
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    tamaguiPlugin({
      config: '../../packages/config/src/tamagui.config.ts',
      optimize: false,
      outputCSS: './app/tamagui.css',
      components: ['tamagui'],
    }),
  ].filter(Boolean),
})

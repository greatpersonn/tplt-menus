import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  plugins: [pluginReact(), pluginSass(), pluginSvgr({ svgrOptions: { exportType: 'named' } })],
  output: {
    distPath: {
      root: 'build',
      image: 'assets',
      svg: 'assets',
      font: 'assets',
      media: 'assets',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'single-vendor',
    },
  },
});
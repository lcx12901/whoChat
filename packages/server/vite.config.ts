import * as path from 'path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
export default defineConfig({
  // ...vite configures
  server: {
    host: '0.0.0.0',
    // vite server configs, for details see \[vite doc\](https://vitejs.dev/config/#server-host)
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      // Nodejs native Request adapter
      // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
      // you can also pass a function if you are using other frameworks, see Custom Adapter section
      adapter: 'nest',
      // tell the plugin where is your project entry
      appPath: './src/main.ts',
      // Optional, default: 'viteNodeApp'
      // the name of named export of you app from the appPath file
      exportName: 'viteNodeApp',
      // Optional, default: 'esbuild'
      // The TypeScript compiler you want to use
      // by default this plugin is using vite default ts compiler which is esbuild
      // 'swc' compiler is supported to use as well for frameworks
      // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
      // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
      tsCompiler: 'swc',
      swcOptions: {
        sourceMaps: true,
        module: {
          type: 'nodenext',
        },
        jsc: {
          target: 'es2017',
          parser: {
            syntax: 'typescript',
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          keepClassNames: true,
          baseUrl: './',
        },
        minify: false,
      },
    }),
  ],
  optimizeDeps: {
    // Vite 不能很好地处理可选依赖项
    // 暂时将它们标记为已忽略
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      'cache-manager',
      'class-transformer',
      'class-validator',
      'fastify-swagger',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});

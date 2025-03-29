const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin'); // You'll need to install this

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // 启用 React 严格模式
  poweredByHeader: false, // 移除 X-Powered-By 响应头（安全优化）
  compress: true,
  output: 'export', // 静态导出模式（生成纯 HTML 文件）
  distDir: '.next',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  images: {
    domains: ['localhost'],
    unoptimized: true, //XXX 静态导出时禁用图片优化
  },
  webpack: (config, { dev, isServer }) => {
    // 路径别名
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    };

    if (!dev) {
      // 生产环境优化
      config.optimization.minimize = true;
      config.optimization.minimizer.push(
        new TerserPlugin({
          terserOptions: {
            compress: {
              // 移除console和debugger
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.info', 'console.debug', 'console.log'],
            },
            mangle: true, // 混淆变量名
            output: {
              comments: false, // 移除注释
            },
          },
          parallel: true, // 并行处理
          extractComments: false, // 不提取注释
        })
      );

      // 添加Gzip压缩
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240, // 仅压缩大于10KB的文件
          minRatio: 0.8, // 压缩率阈值
        }),
        // 复制静态文件
        new CopyPlugin({
          patterns: [
            {
              from: path.join(__dirname, 'public'),
              to: path.join(__dirname, '.next'),
            },
          ],
        })
      );

      // 代码分割配置
      config.optimization.splitChunks = {
        chunks: 'all', // 对所有类型的chunk进行分割
        maxInitialRequests: Infinity,
        minSize: 20000, // 最小分割大小
        cacheGroups: {
          // 第三方库分割
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          // 样式文件分割
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
    }

    // 设置静态资源路径
    config.output.publicPath = process.env.NODE_ENV === 'production' ? '/_next/' : '/_next/';

    return config;
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;

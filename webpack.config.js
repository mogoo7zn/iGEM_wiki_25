const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',    // Warning: 线上发布需要修改
    clean: true,
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@assets': path.resolve(__dirname, 'public/assets')
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: 'images/[name]-[hash][ext]',
          publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true,
              modules: {
                mode: 'icss',
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts/',
              publicPath: '/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE === 'true' ? 'server' : 'disabled'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  devServer: {
    static: [
      { directory: path.join(__dirname, 'public') }
    ],
    port: 3000,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/team/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    },
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 30,
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
          priority: -10,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimize: true,
    runtimeChunk: 'single'
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 244 * 1024,
    maxEntrypointSize: 500 * 1024
  }
};
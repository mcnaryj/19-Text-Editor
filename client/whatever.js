const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
// Require the GenerateSW class of the WorkBoxPlugin 
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. DONE?
// TODO: Add CSS loaders and babel to webpack. DONE?

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'i HATE JATE',
      }),
      // new WorkboxPlugin.GenerateSW(),     
      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

    // Creates a manifest.json file.
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'JATE Logo',
      short_name: 'HATE',
      description: 'Laurel strongly dislikes JATE!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
// do i need this line??
      // new WorkboxPlugin.GenerateSW()
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
                    // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
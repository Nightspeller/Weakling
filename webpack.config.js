const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// eslint-disable-next-line no-unused-vars
const WebpackFreeTexPacker = require('webpack-free-tex-packer');

const freeTexturePackerSources = [path.resolve(__dirname, 'assets/ftp-project/icons/.')];
const freeTexturePackerOptions = {
  textureName: 'icons',
  textureFormat: 'png',
  removeFileExtension: true,
  prependFolderName: true,
  base64Export: false,
  tinify: false,
  tinifyKey: '',
  scale: 1,
  filter: 'none',
  exporter: 'Phaser3',
  width: 512,
  height: 2048,
  fixedSize: false,
  powerOfTwo: false,
  padding: 0,
  extrude: 1,
  allowRotation: false,
  allowTrim: false,
  trimMode: 'trim',
  alphaThreshold: '0',
  detectIdentical: true,
  packer: 'MaxRectsBin',
  packerMethod: 'BestShortSideFit',
};

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }, /*
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: 'file-loader',
      }, */
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/index.html',
      favicon: './src/favicon.png',
    }),
    new WebpackPwaManifest({
      name: 'Weakling!',
      short_name: 'Weakling!',
      description: 'Serg Nights presents: Weakling!',
      theme_color: '#2196f3',
      background_color: '#2196f3',
      fingerprints: false,
      ios: true,
      includeDirectory: false,
      publicPath: '.',
      display: 'fullscreen',
      orientation: 'landscape',
      scope: '.',
      start_url: 'https://nightspeller.github.io/Weakling/dist/',
      icons: [
        {
          src: path.resolve('src/pwa-icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: path.resolve('src/pwa-icons/icon-512x512.png'),
          size: '1024x1024', // you can also use the specifications pattern
        },
        {
          src: path.resolve('src/pwa-icons/icon-512x512.png'),
          size: '1024x1024',
          purpose: 'maskable',
        },
      ],
    }),
    new WorkboxPlugin.GenerateSW({ maximumFileSizeToCacheInBytes: 26214400 }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/plugins', to: 'plugins' },
      ],
    }),
    new WebpackFreeTexPacker(freeTexturePackerSources, 'assets/images-extruded/interface', freeTexturePackerOptions),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

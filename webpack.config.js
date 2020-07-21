const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const autoprefixer = require('autoprefixer');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const getCssLoaders = () => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ];
};
const getFileName = (extension) => isDev ? `[name].${extension}` : `[name].[hash].${extension}`; 
const getOptimizationConfig = () => {
  const cfg = {
    splitChunks: {
      chunks: 'all'
    }
  };
  if (isProd) {
    cfg.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ];
  }
  return cfg;
};

getPlugins = () => {
  const plugins = [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackInjector(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: getFileName('css')
    }),
    // new CopyWebpackPlugin()
  ];

  if (isProd) {
    return [ ...plugins, new BundleAnalyzerPlugin() ];
  }

  return plugins;
};

module.exports = {
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: getFileName('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    // alias: {

    // }
  },
  devtool: isDev ? 'source-map' : '',
  optimization: getOptimizationConfig(),
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: getPlugins(),
  module: {
    rules : [
      // JS
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          'eslint-loader'
        ],
      },
      // Sass\CSS
      {
        test: /\.css$/,
        use: getCssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          ...getCssLoaders(),
          {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    autoprefixer()
                ],
                sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
                sourceMap: isDev
            }
        }
        ]
      },
      // images
      {
        test: /.(png|jpe?g|gif|webp)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65,
                progressive: true
              },
              pngquant: {
                quality: [0.65, 1],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 25
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      },
      // fonts
      {
        test: /.(woff|woff2|eot)$/,
        use: ['file-loader']
      }
    ]
  }
};
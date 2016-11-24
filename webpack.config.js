//webpack.config.js
const path = require('path');
const webpack = require('webpack');

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

const config = {
  devtool: 'eval-source-map',
  entry: {
    app: ['./src/main.js'],
    vendor: ['pixi', 'p2', 'phaser']
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true, 
    path: "/dist/",
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /lib/] ,
        include: path.join(__dirname, 'src'),
        query: {
          babelrc: false,
          "presets": ["es2015"]
        }
      },
      { test: /pixi\.js/, loader: 'expose?PIXI' },
      { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
      { test: /p2\.js/, loader: 'expose?p2' },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.xml?|\.fnt$/, 
        loader: "file-loader?limit=10000" }
 
    ]
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
            BROWSER: JSON.stringify(true)
        }
    })
  ],
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
}

module.exports = config;
const { environment } = require('@rails/webpacker')
const erb =  require('./loaders/erb')
var path = require('path');

var excluded_css = path.resolve(__dirname,"../../app/javascript/angular")

var css_loader = environment.loaders.get('css')
environment.loaders.delete('css')

css_loader.exclude = [excluded_css]
environment.loaders.append('css', css_loader)

environment.loaders.append('erb', erb)

const webpack = require('webpack')
environment.plugins.append('Provide', new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Popper: ['popper.js', 'default']
}))
module.exports = environment

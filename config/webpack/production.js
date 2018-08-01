const environment = require('./environment')
const typescript =  require('./loaders/aot_typescript')
const angular_html =  require('./loaders/angular_html')
const angular_css =  require('./loaders/angular_css')

environment.plugins.append('angular_aot_plugin', typescript.plugin)
environment.loaders.append('aot_typescript', typescript.handler)
environment.loaders.append('angular_html', angular_html)
environment.loaders.append('angular_css', angular_css)
environment.config.devtool = false

module.exports = environment.toWebpackConfig()
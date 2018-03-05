const environment = require('./environment')
const typescript =  require('./loaders/aot_typescript')
const angular_html =  require('./loaders/angular_html')
const angular_css =  require('./loaders/angular_css')

environment.loaders.append('aot_typescript', typescript)
environment.loaders.append('angular_html', angular_html)
environment.loaders.append('angular_css', angular_css)

module.exports = environment.toWebpackConfig()

const environment = require('./environment')
const angular_html =  require('./loaders/angular_html')
const css =  require('./loaders/css')

// Overide default handler
environment.loaders.append('angular_html', angular_html)
environment.loaders.delete('css')
environment.loaders.append('css', css)

module.exports = environment.toWebpackConfig()

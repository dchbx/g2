const environment = require('./environment')
const angular_html =  require('./loaders/angular_html')
const css =  require('./loaders/css')

// Overide default handler
environment.loaders.set('css', css)
environment.loaders.append('angular_html', angular_html)

module.exports = environment.toWebpackConfig()

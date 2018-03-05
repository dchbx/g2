var path = require('path');

module.exports = {
  test: /\.css$/,
  include: [path.resolve(__dirname,"../../../app/javascript/angular")],
  use: [
    {loader: "raw-loader"}
  ]
}

module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  use: [{
    loader: 'ts-loader',
    options: {
	    configFile: "tsconfig.app.json"
    }
  },
  { loader: 'angular2-template-loader'}]
}

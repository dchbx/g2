const {AngularCompilerPlugin} = require('@ngtools/webpack')

var path = require('path');

var tsconfigpath = path.resolve(__dirname,"../../../app/javascript/angular/src/tsconfig.prod.json")
var mainPath = path.resolve(__dirname,"../../../app/javascript/angular/src/main.prod.ts")
var entryModule = path.resolve(__dirname,"../../../app/javascript/angular/src/app/app.module#AppModule")

var aotPlugin = new AngularCompilerPlugin({
	 tsConfigPath: tsconfigpath,
	 mainPath: mainPath,
	 entryModule: entryModule,
	 debug: true
	 })

module.exports = {
  plugin: aotPlugin,
  handler: {
	  test: /\.ts$/,
	  use : [{
             loader: '@ngtools/webpack'
          }]
  }
}

import {Application}    from "qtk";
import {MainModel}      from "./models/main-model";
import {MainWindow}     from "./views/main-window"
import {MainViewModel}  from "./view-models/main-view-model";

var themeDataURL    = "assets/theme/default/theme.js";
var appThemeDataURL = "assets/theme/default/demo.js";

export class App extends Application {
	public onReady() {
		var viewModel = MainViewModel.create(null);
		var mainWindow = MainWindow.create({app:this, viewModel:viewModel}).maximize();
	}
	
	public static run() : App {
		var app = new App("QToolKit Studio");
		var assetsURLs = [themeDataURL, appThemeDataURL];

		app.preload(assetsURLs, function() {
			app.init({sysThemeDataURL:themeDataURL, appThemeDataURL:appThemeDataURL});
			app.run();
		});

		return app;
	}
};


import {Application} from "qtk";
import {MainWindow} from "./views/main-window"
import {StudioModel} from "./models/studio-model";
import {StudioViewModel}  from "./view-models/studio-view-model";

var themeDataURL = "/www/assets/theme/default/theme.json";

export class StudioApp extends Application {
	protected createViewModel() {
		return StudioViewModel.create({});
	}

	public onReady() {
		var viewModel = this.createViewModel();
		var mainWindow = MainWindow.create({app:this, viewModel:viewModel}).maximize();
	}
	
	public static run() : StudioApp {
		var app = new StudioApp("qtk-studio");
		app.init({sysThemeDataURL:themeDataURL});
		app.run();

		return app;
	}
};

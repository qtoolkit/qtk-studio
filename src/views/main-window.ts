import {Direction, Application} from "qtk";
import {MainMenuBar} from "./main-menu-bar";
import {MainToolBar} from "./main-tool-bar";
import {Widget, IViewModel, WindowNormal, DockLayouter, DockLayouterParam} from "qtk"

export class MainWindow extends WindowNormal {
	protected viewModel : IViewModel;

	protected onCreated() {
		super.onCreated();

		var viewModel = this.viewModel;
		this.childrenLayouter = DockLayouter.create();

		this.addChild(MainMenuBar.create({viewModel:viewModel, 
			layoutParam : DockLayouterParam.create({position:Direction.TOP, size:30})
		}));
		
		this.addChild(MainToolBar.create({viewModel:viewModel, 
			layoutParam : DockLayouterParam.create({position:Direction.TOP, size:30})
		}));
	}

	public static create(options:any) : MainWindow {
		var win = new MainWindow();
		win.reset("main-window", options);
		win.open();

		return win;
	}
};



import {DesignView} from "./design-view"
import {MainMenuBar} from "./main-menu-bar"
import {MainToolBar} from "./main-tool-bar"
import {MainModel} from "../models/main-model";
import {MainTabControl} from "./main-tab-control";
import {ComponentListView} from "./component-list-view"
import {MainViewModel} from "../view-models/main-view-model"

import {TabButton, TabControl, TableClient, Events} from "qtk";
import {WindowNormal, SimpleLayouter, SimpleLayouterParam, DockLayouter, DockLayouterParam} from "qtk"
import {IViewModel, ViewModel, ListView, Edit, Group, RadioButton, Button, Rect, Label, Direction} from "qtk";

export class MainWindow extends WindowNormal {
	protected viewModel : MainViewModel;
	protected tabControl : MainTabControl;

	protected createNewTab() {
		var viewModel:MainViewModel = this.viewModel;
		var docName = viewModel.getDocName();
		var tabControl = this.tabControl;

		var clientView = Group.create({
			name:"client-view",
			childrenLayouter : SimpleLayouter.create(),
			layoutParam : SimpleLayouterParam.create("0", "0", "100%", "100%")
		})

		var page = tabControl.addPage(docName, null, null, true);

		page.addChild(clientView);
		page.childrenLayouter = SimpleLayouter.create();

		clientView.addChild(DesignView.create({
			name:"design-view",
			viewModel:viewModel, 
			layoutParam : SimpleLayouterParam.create("0", "0", "100%", "100%")
		}));

		clientView.addChild(ComponentListView.create({
			movable:true,
			layoutParam : SimpleLayouterParam.create("10", "10", "200", "90%")
		}));

		this.tabControl.activePage = page;
	}

	protected onCreated() {
		super.onCreated();

		var viewModel:MainViewModel = this.viewModel;
		this.childrenLayouter = DockLayouter.create();

		this.addChild(MainMenuBar.create({
			viewModel:viewModel, 
			layoutParam : DockLayouterParam.create(Direction.TOP, "30")
		}));
		
		this.addChild(MainToolBar.create({
			viewModel:viewModel, 
			layoutParam : DockLayouterParam.create(Direction.TOP, "30")
		}));

		var tabControl = MainTabControl.create({
			expandButton : false,
			buttonGroupAtTop : true,
			layoutParam : DockLayouterParam.create(Direction.TOP, "100%")
		});
		
		this.addChild(tabControl);
		this.tabControl = tabControl;

		viewModel.on(MainViewModel.EVT_DOC_NEW, (evt) => {
			this.createNewTab();
		});
		viewModel.on(MainViewModel.EVT_DOC_RENAME, (evt) => {
			this.tabControl.renamePageByModel(viewModel.model);
		});
		viewModel.on(MainViewModel.EVT_DOC_OPEN, (evt) => {
			var model = viewModel.model;
			if(!model.view) {
				this.createNewTab();
			}else{
				this.tabControl.activatePageByModel(viewModel.model);
			}
		});

		tabControl.on(Events.CHANGE, (evt:Events.ChangeEvent) => {
			var page = tabControl.activePage;
			if(page) {
				var clientView = page.children[0];
				if(clientView) {
					var designView = <DesignView>clientView.findChildByName("design-view");	
					designView.activate();
				}
			}
		});
	}

	public static create(options:any) : MainWindow {
		var win = new MainWindow();
		win.reset("main-window", options);
		win.open();

		return win;
	}
};

import {Widget, MenuBar, MenuBarItem, Menu, MenuItem, IViewModel} from "qtk";

export class MainMenuBar extends MenuBar {
	protected viewModel : IViewModel;

	protected onFileMenu(menu:Menu) {
		menu.w = 128;
		menu.addItem("New", null).set({dataBindingRule:{click:{command:"new"}}});
		menu.addItem("Open", null).set({dataBindingRule:{click:{command:"open"}}});
		menu.addItem("Save", null).set({dataBindingRule:{click:{command:"save"}}});
		menu.addItem("Save As", null).set({dataBindingRule:{click:{command:"save-as"}}});
		menu.addItem("Remove", null).set({dataBindingRule:{click:{command:"remove"}}});
		menu.addSpace();
		menu.addItem("Export", null).set({dataBindingRule:{click:{command:"export"}}});

		menu.bindData(this.viewModel);
	}
	
	protected onHelpMenu(menu:Menu) {
		menu.w = 128;
		menu.addItem("Content", null).set({dataBindingRule:{click:{command:"content"}}});
		menu.addItem("About", null).set({dataBindingRule:{click:{command:"about"}}});

		menu.bindData(this.viewModel);
	}

	protected onCreated() {
		super.onCreated();

		this.addLogo("/www/assets/theme/default/images/@density/logo.png");
		this.addItem("File", this.onFileMenu.bind(this));
		this.addItem("Help", this.onHelpMenu.bind(this));
	}

	public static create(options: any) : MainMenuBar {
		var menuBar = new MainMenuBar();
		menuBar.reset("menu-bar", options);

		return menuBar;
	}
};


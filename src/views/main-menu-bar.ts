import {MainCmdsDesc} from "./main-cmds-desc";
import {Events, DockLayouterParam, Direction, DeviceInfo} from "qtk";
import {IViewModel, Widget, MenuBar, MenuBarItem, Menu, MenuItem} from "qtk";

export class MainMenuBar extends MenuBar {
	protected viewModel : IViewModel;

	protected addShortcut(key:string, command:string) {
		var shortcut = key.toLowerCase();
		var viewModel = this.viewModel;

		this.win.on(Events.SHORTCUT, (evt:Events.ShortcutEvent) => {
			if(evt.keys === shortcut) {
				viewModel.execCommand(command, null);
			}
		});
	}

	protected addMenuItem(menu:Menu, text:string, key:string, command:string) : MenuItem {
		var item:MenuItem = null;
		if(!text) {
			item = <MenuItem>menu.addSpace();
		}else{
			item = <MenuItem>menu.addItem(text, null, null, key);
			item.set({dataBindingRule:{click:{command:command}}});
		}
		
		return item;
	}

	protected addShortcuts(cmdsDesc:any) {
		for(var category in cmdsDesc) {
			for(var cmd in cmdsDesc[category]) {
				var desc = cmdsDesc[category][cmd];
				if(desc.shortcut) {
					this.addShortcut(desc.shortcut, desc.command);
				}
			}
		}
	}

	protected createMenu(cmdsDesc:any) {
		var bar = this;
		var viewModel = this.viewModel;

		this.addLogo("https://qtoolkit.github.io/demos/assets/icons/@density/apple.png");

		function addItem(key:string, descs:any) {
			var w = key.length > 5 ? 70 : 50;

			bar.addItem(key, (menu:Menu) => {
				menu.w = 200;
				for(var cmd in descs) {
					var desc = descs[cmd];
					bar.addMenuItem(menu, desc.text, desc.shortcut, desc.command); 
				}
				menu.bindData(viewModel);
			}, w);
		}

		for(var key in cmdsDesc) {
			addItem(key, cmdsDesc[key]);
		}
	}

	protected onInit() {
		super.onInit();

		this.createMenu(MainCmdsDesc);
		this.addShortcuts(MainCmdsDesc);
	}

	public static create(options: any) : MainMenuBar {
		var menuBar = new MainMenuBar();
		menuBar.reset("menu-bar", options);

		return menuBar;
	}
};


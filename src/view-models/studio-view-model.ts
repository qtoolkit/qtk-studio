import {DelegateValueConverter, DelegateFilter, DelegateComparator, ValidationResult} from "qtk";
import {KeyEvent, Events, ViewModel, DelegateCommand} from "qtk";

import {CommandNew} from "./command-new";
import {CommandSave} from "./command-save";
import {CommandOpen} from "./command-open";
import {CommandRemove} from "./command-remove";
import {CommandDownload} from "./command-download";
import {CommandContent} from "./command-content";
import {CommandAbout} from "./command-about";

export class StudioViewModel extends ViewModel {
	constructor(data:any) {
		super(data);

		this.initCommands();
	}

	private initCommands() {
		this.registerCommand("new", CommandNew.create(this));
		this.registerCommand("open", CommandOpen.create(this));
		this.registerCommand("save", CommandSave.create(this, true));
		this.registerCommand("remove", CommandRemove.create(this));
		this.registerCommand("download", CommandDownload.create(this));
		this.registerCommand("content", CommandContent.create(this, "https://github.com/qtoolkit/qtk"));
		this.registerCommand("about", CommandAbout.create(this));
	}
	
	public removeDoc(fileName:string) {
	}
	
	public saveDoc(fileName:string) {
	}

	public openDoc(fileName:string) {
	}

	public getDocList() : Array<string> {
		return [];
	}

	public static create(data) : StudioViewModel {
		return new StudioViewModel(data);
	}
}

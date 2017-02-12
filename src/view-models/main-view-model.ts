import {CommandNew} from "./command-new";
import {CommandOpen} from "./command-open";
import {CommandSave} from "./command-save";
import {CommandAbout} from "./command-about";
import {CommandRemove} from "./command-remove";
import {CommandContent} from "./command-content";
import {CommandProjectSettings} from "./command-project-settings";

import {CmdHistory} from "../editor-cmds/cmd-history";

import {Storage} from "../models/storage"
import {MainModel} from "../models/main-model";
import {KeyEvent, Widget, Events, ViewModel, DelegateCommand} from "qtk";
import {DelegateValueConverter, DelegateFilter, DelegateComparator, ValidationResult} from "qtk";

export class MainViewModel extends ViewModel {
	public model : MainModel;

	public nonameIndex : number;
	public static EVT_DOC_NEW   = "doc-new";
	public static EVT_DOC_OPEN  = "doc-open";
	public static EVT_DOC_RENAME = "doc-rename";

	protected models : Array<MainModel>;

	constructor(model:MainModel) {
		super(model);
		this.models = [];
		this.nonameIndex = 0;
		this.initCommands();
	}

	public addModel(model:MainModel) {
		this.models.push(model);
	}

	public removeModel(model:MainModel) : boolean {
		var index = this.models.indexOf(model);
		if(index >= 0) {
			this.models.splice(index, 1);
		}

		if(this.model === model) {
			this.model = null;
		}	

		return index >= 0;
	}

	protected findModel(docName:string) : MainModel {
		return this.models.find((iter:MainModel) => {
			return iter.docName === docName;
		})
	}

	protected initCommands() {
		this.registerCommand("about",   CommandAbout.create(this));
		this.registerCommand("new",     CommandNew.create(this));
		this.registerCommand("open",    CommandOpen.create(this));
		this.registerCommand("save",    CommandSave.create(this, false));
		this.registerCommand("save-as", CommandSave.create(this, true));
		this.registerCommand("remove",  CommandRemove.create(this));
		this.registerCommand("content", CommandContent.create(this));
		this.registerCommand("showProjectSettings", CommandProjectSettings.create(this.model));

		this.registerDelegateCommand("align-left", this.alignLeft, this.canAlign);
		this.registerDelegateCommand("align-right", this.alignRight, this.canAlign);
		this.registerDelegateCommand("align-top", this.alignTop, this.canAlign);
		this.registerDelegateCommand("align-bottom", this.alignBottom, this.canAlign);
		this.registerDelegateCommand("align-center", this.alignCenter, this.canAlign);
		this.registerDelegateCommand("align-middle", this.alignMiddle, this.canAlign);
		this.registerDelegateCommand("align-width", this.alignToSameWidth, this.canAlign);
		this.registerDelegateCommand("align-height", this.alignToSameHeight, this.canAlign);
		this.registerDelegateCommand("align-dist-h", this.alignDistH, this.canDistribute);
		this.registerDelegateCommand("align-dist-v", this.alignDistV, this.canDistribute);
		
		this.registerDelegateCommand("copy", this.copy, this.canCopy);
		this.registerDelegateCommand("cut", this.cut, this.canCut);
		this.registerDelegateCommand("paste", this.paste, this.canPaste);
		this.registerDelegateCommand("delete", this.del, this.canDelete);
		
		this.registerDelegateCommand("undo", this.undo, this.canUndo);
		this.registerDelegateCommand("redo", this.redo, this.canRedo);
	}

	private registerDelegateCommand(name:string, exec:Function, canExec:Function) {
		this.registerCommand(name, DelegateCommand.create(exec.bind(this), canExec.bind(this)));
	}

	public countSelectedWidget() {
		return this.model ? this.model.countSelectedShapes() : 0;
	}

	public copy() {
		this.model.copy();
	}

	public cut() {
		this.model.cut();
	}

	public paste() {
		this.model.paste();
	}
	
	public del() {
		this.model.del();
	}

	public canDelete() : boolean {
		return this.countSelectedWidget() > 0;
	}
	
	public canCopy() : boolean {
		return this.countSelectedWidget() > 0;
	}

	public canCut() : boolean {
		return this.countSelectedWidget() > 0;
	}	
	
	public canPaste() : boolean {
		return this.model && this.model.canPaste();
	}

	public undo() : boolean {
		return this.model.cmdHistory.undo();
	}

	public redo() : boolean {
		return this.model.cmdHistory.redo();
	}

	public canUndo() : boolean {
		return this.model && this.model.cmdHistory.canUndo();
	}
	
	public canRedo() : boolean {
		return this.model && this.model.cmdHistory.canRedo();
	}
	
	public getDocName() : string {
		return this.model.docName;
	}

	public getDocList() : Array<string> {
		return Storage.getDocList();
	}
	
	public genNoName() : string {
		return "noname-" + this.nonameIndex++;
	}

	public isNoName(docName:string) : boolean {
		return !docName || docName.indexOf("noname-") === 0;
	}

	public newDoc() : boolean {
		this.model = MainModel.create();
		this.addModel(this.model);
		this.model.docName = this.genNoName();
		this.dispatchEvent(Events.AnyEvent.create(MainViewModel.EVT_DOC_NEW, this));
		
		return true;
	}

	public saveDoc(docName : string) : boolean {
		if(this.model.docName !== docName) {
			this.model.docName = docName;
			this.dispatchEvent(Events.AnyEvent.create(MainViewModel.EVT_DOC_RENAME, this));
		}

		var data = JSON.stringify(this.model.saveToJson(), null, '\t');
		
		return Storage.saveDoc(docName, data);
	}

	public openDoc(docName : string) {
		var model = this.findModel(docName);
		if(!model) {
			model = MainModel.create();
			model.docName = docName;
			this.addModel(model);
		}
		this.model = model;
		
		this.dispatchEvent(Events.AnyEvent.create(MainViewModel.EVT_DOC_OPEN, this));

		var str = Storage.openDoc(docName);
		if(str) {
			try {
				this.model.loadFromJson(JSON.parse(str));
			}catch(e) {
				console.dir(e);
				return false;
			}
		}

		return true;
	}

	public removeDoc(docName : string) : boolean {
		return Storage.removeDoc(docName);
	}	
	
	public canAlign() : boolean {
		return this.countSelectedWidget() > 1;
	}

	public alignMiddle() : boolean {
		return this.model.alignMiddle();
	}

	public alignCenter() : boolean {
		return this.model.alignCenter();
	}

	public alignLeft() : boolean {
		return this.model.alignLeft();
	}

	public alignTop() : boolean {
		return this.model.alignTop();
	}

	public alignRight() : boolean {
		return this.model.alignRight();
	}

	public alignBottom() : boolean {
		return this.model.alignBottom();
	}

	public alignToSameWidth() : boolean {
		return this.model.alignToSameWidth();
	}
	
	public alignToSameHeight() : boolean {
		return this.model.alignToSameHeight();
	}

	public canDistribute() : boolean {
		return this.countSelectedWidget() > 2;
	}	

	public alignDistH() : boolean {
		return this.model.alignDistH();
	}
	
	public alignDistV() : boolean {
		return this.model.alignDistV();
	}

	public static create(model:MainModel): MainViewModel {
		return new MainViewModel(model);
	}
}

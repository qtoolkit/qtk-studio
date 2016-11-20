import {Button, Widget, Group, IViewModel, LinearLayouter, LinearLayouterParam, CheckButton} from "qtk";

export class MainToolBar extends Group {
	protected viewModel : IViewModel;

	protected addButton(command:string, tips:string) {
		var btn = Button.create({
				tips : tips, 
				styleType:"toolbar." + command, 
				dataBindingRule:{click:{command:command}},
				layoutParam : LinearLayouterParam.create({w:40})});
		this.addChild(btn);
	}

	protected onCreated() {
		super.onCreated();
		this.childrenLayouter = LinearLayouter.createH();
		this.addButton("new", "Create New File");	
		this.addButton("save", "Save File");	
		this.addButton("open", "Open File");	
		
		this.bindData(this.viewModel);
	}

	public static create(options: any) : MainToolBar {
		var toolBar = new MainToolBar();
		toolBar.reset("tool-bar", options);

		return toolBar;
	}
};


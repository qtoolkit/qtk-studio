import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest, PropsInfo, PagePropsDesc} from "qtk";

export class CommandAbout implements ICommand {
	protected _propsInfo : PropsInfo;
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel, propsInfo:PropsInfo) {
		this._viewModel = viewModel;
		this._propsInfo = propsInfo;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {
		InteractionRequest.props(this._propsInfo, function(ret) {
		});

		return true;
	}

	public static create(viewModel:StudioViewModel) : ICommand {
		var data = {
			author: "Li XianJing",
			email: "xianjimli@hotmail.com",
			home: "https://github.com/qtoolkit/qtk",
		};
		
		var descJson = [
			{type:"text-readonly", name:"Author", path:"author"},
			{type:"link", name:"Email", path:"email"},
			{type:"link", name:"Home", path:"home"},
		];

		var pagePropsDesc = PagePropsDesc.create("About", descJson);
		var propsInfo = PropsInfo.create(pagePropsDesc, data, false, 300);

		return new CommandAbout(viewModel, propsInfo);
	}
};

import {ICommand} from "qtk";
import {MainViewModel} from "./main-view-model";

export class CommandContent implements ICommand {
	protected _helpURL : string;
	protected _viewModel : MainViewModel;

	constructor(viewModel:MainViewModel, helpURL:string) {
		this._viewModel = viewModel;
		this._helpURL = helpURL;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {
		console.log("CommandContent");
		window.open(this._helpURL, "_blank");
		return true;
	}

	public static create(viewModel:MainViewModel) : ICommand {
		return new CommandContent(viewModel, "https://github.com/qtoolkit/qtk");
	}
};

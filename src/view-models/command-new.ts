import {MainViewModel} from "./main-view-model";
import {ICommand, InteractionRequest, ChoiceInfo} from "qtk";

export class CommandNew implements ICommand {
	protected _viewModel : MainViewModel;

	constructor(viewModel:MainViewModel) {
		this._viewModel = viewModel;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {
		this._viewModel.newDoc();			
		return true;
	}

	public static create(viewModel:MainViewModel) : ICommand {
		return new CommandNew(viewModel);
	}
};

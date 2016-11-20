import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest, ChoiceInfo} from "qtk";

export class CommandNew implements ICommand {
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel) {
		this._viewModel = viewModel;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {

		return true;
	}

	public static create(viewModel:StudioViewModel) : ICommand {

		return new CommandNew(viewModel);
	}
};

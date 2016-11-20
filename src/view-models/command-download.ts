let saveAs = require('save-as').default;

import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest} from "qtk";

export class CommandDownload implements ICommand {
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel) {
		this._viewModel = viewModel;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {
		let viewModel = this._viewModel;
	//	let blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
	//	saveAs(blob, 'dialog.json')
		
		return true;
	}

	public static create(viewModel:StudioViewModel) : ICommand {
		return new CommandDownload(viewModel);
	}
};

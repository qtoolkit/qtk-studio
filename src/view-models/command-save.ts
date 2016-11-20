import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest, ToastInfo, InputInfo} from "qtk";

export class CommandSave implements ICommand {
	protected _isSaveAs : boolean;
	protected _inputInfo : InputInfo;
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel, isSaveAs:boolean) {
		this._isSaveAs = isSaveAs;
		this._viewModel = viewModel;
		this._inputInfo = InputInfo.create("Please input file name:", null);
	}

	public canExecute() : boolean {
		return false;
	}

	public execute(args:any) : boolean {
		var viewModel = this._viewModel;
		var fileName = null;

		if(!fileName || this._isSaveAs) {
			InteractionRequest.input(this._inputInfo, function(ret:InputInfo) {
			});
		}else{
			viewModel.saveDoc(fileName);
			InteractionRequest.toast(ToastInfo.create("Save done."));
		}

		return true;
	}

	public static create(viewModel:StudioViewModel, isSaveAs:boolean) : ICommand {
		return new CommandSave(viewModel, isSaveAs);
	}
};

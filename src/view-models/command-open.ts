import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest, ChoiceInfo} from "qtk";

export class CommandOpen implements ICommand {
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel) {
		this._viewModel = viewModel;
	}

	public canExecute() : boolean {
		var viewModel = this._viewModel;
		return true;
	}

	public execute(args:any) : boolean {
		var viewModel = this._viewModel;
		var docList = viewModel.getDocList();
		var choiceInfo = ChoiceInfo.create("Open...", false, 300, 300);
		docList.forEach((item:string) => {
			choiceInfo.addOption(item);
		});

		InteractionRequest.choice(choiceInfo, (ret:ChoiceInfo) => {
			var arr = ret.value;
			if(arr && arr.length) {
				var fileName = arr[0].text;
				viewModel.openDoc(fileName);
			}
		});

		return true;
	}

	public static create(viewModel:StudioViewModel) : ICommand {

		return new CommandOpen(viewModel);
	}
};

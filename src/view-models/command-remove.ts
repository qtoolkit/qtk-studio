import {StudioViewModel} from "./studio-view-model";
import {ICommand, InteractionRequest, ConfirmationInfo, ChoiceInfo} from "qtk";

export class CommandRemove implements ICommand {
	protected _viewModel : StudioViewModel;

	constructor(viewModel:StudioViewModel) {
		this._viewModel = viewModel;
	}

	public canExecute() : boolean {
		var viewModel = this._viewModel;
		var docList = viewModel.getDocList();
		return docList && docList.length > 0;
	}

	protected confirmRemove(items:Array<any>) {
		var viewModel = this._viewModel;
		var fileNames = items.map(item => {
			return item.text;
		}).join(",");

		var info = ConfirmationInfo.create("Are you sure to remove " + fileNames + " ?", 300);
		InteractionRequest.confirm(info, ret => {
			if(info.confirmed) {
				items.forEach(item => {
					viewModel.removeDoc(item.text);
				});
			}
		});
	}

	public execute(args:any) : boolean {
		var viewModel = this._viewModel;
		var docList = viewModel.getDocList();
		var choiceInfo = ChoiceInfo.create("Remove...", true, 300, 300);
		docList.forEach((item:string) => {
			choiceInfo.addOption(item);
		});

		InteractionRequest.choice(choiceInfo, (ret:ChoiceInfo) => {
			var arr = ret.value;
			if(arr && arr.length) {
				this.confirmRemove(arr);
			}
		});

		return true;
	}

	public static create(viewModel:StudioViewModel) : ICommand {
		return new CommandRemove(viewModel);
	}
};

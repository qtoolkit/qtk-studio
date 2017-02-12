import {CollectionViewModel} from "qtk";

export class ControlsViewModel extends CollectionViewModel {

	public static create(data:any) : ControlsViewModel {
		return new ControlsViewModel(data);
	}    
}
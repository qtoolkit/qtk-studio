import { StudioViewModel } from "./studio-view-model";
import { ICommand, InputInfo } from "qtk";
export declare class CommandSave implements ICommand {
    protected _isSaveAs: boolean;
    protected _inputInfo: InputInfo;
    protected _viewModel: StudioViewModel;
    constructor(viewModel: StudioViewModel, isSaveAs: boolean);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: StudioViewModel, isSaveAs: boolean): ICommand;
}

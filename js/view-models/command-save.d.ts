import { MainViewModel } from "./main-view-model";
import { ICommand, InputInfo } from "qtk";
export declare class CommandSave implements ICommand {
    protected _isSaveAs: boolean;
    protected _inputInfo: InputInfo;
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel, isSaveAs: boolean);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel, isSaveAs: boolean): ICommand;
}

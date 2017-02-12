import { ICommand } from "qtk";
import { MainViewModel } from "./main-view-model";
export declare class CommandCut implements ICommand {
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel): ICommand;
}

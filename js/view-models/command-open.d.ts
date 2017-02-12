import { MainViewModel } from "./main-view-model";
import { ICommand } from "qtk";
export declare class CommandOpen implements ICommand {
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel): ICommand;
}

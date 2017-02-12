import { MainViewModel } from "./main-view-model";
import { ICommand } from "qtk";
export declare class CommandRemove implements ICommand {
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel);
    canExecute(): boolean;
    protected confirmRemove(items: Array<any>): void;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel): ICommand;
}

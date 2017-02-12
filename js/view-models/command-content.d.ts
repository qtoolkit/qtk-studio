import { ICommand } from "qtk";
import { MainViewModel } from "./main-view-model";
export declare class CommandContent implements ICommand {
    protected _helpURL: string;
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel, helpURL: string);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel): ICommand;
}

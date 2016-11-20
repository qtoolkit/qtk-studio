import { ICommand } from "qtk";
import { StudioViewModel } from "./studio-view-model";
export declare class CommandContent implements ICommand {
    protected _helpURL: string;
    protected _viewModel: StudioViewModel;
    constructor(viewModel: StudioViewModel, helpURL: string);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: StudioViewModel, helpURL: string): ICommand;
}

import { StudioViewModel } from "./studio-view-model";
import { ICommand } from "qtk";
export declare class CommandOpen implements ICommand {
    protected _viewModel: StudioViewModel;
    constructor(viewModel: StudioViewModel);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: StudioViewModel): ICommand;
}

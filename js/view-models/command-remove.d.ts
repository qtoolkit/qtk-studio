import { StudioViewModel } from "./studio-view-model";
import { ICommand } from "qtk";
export declare class CommandRemove implements ICommand {
    protected _viewModel: StudioViewModel;
    constructor(viewModel: StudioViewModel);
    canExecute(): boolean;
    protected confirmRemove(items: Array<any>): void;
    execute(args: any): boolean;
    static create(viewModel: StudioViewModel): ICommand;
}

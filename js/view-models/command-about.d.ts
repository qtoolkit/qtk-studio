import { StudioViewModel } from "./studio-view-model";
import { ICommand, PropsInfo } from "qtk";
export declare class CommandAbout implements ICommand {
    protected _propsInfo: PropsInfo;
    protected _viewModel: StudioViewModel;
    constructor(viewModel: StudioViewModel, propsInfo: PropsInfo);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: StudioViewModel): ICommand;
}

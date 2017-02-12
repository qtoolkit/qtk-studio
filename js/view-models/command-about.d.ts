import { MainViewModel } from "./main-view-model";
import { ICommand, PropsInfo } from "qtk";
export declare class CommandAbout implements ICommand {
    protected _propsInfo: PropsInfo;
    protected _viewModel: MainViewModel;
    constructor(viewModel: MainViewModel, propsInfo: PropsInfo);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: MainViewModel): ICommand;
}

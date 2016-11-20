import { ParticlesViewModel } from "./particles-view-model";
import { ICommand, ChoiceInfo } from "qtk";
export declare class CommandExport implements ICommand {
    protected _choiceInfo: ChoiceInfo;
    protected _viewModel: ParticlesViewModel;
    constructor(viewModel: ParticlesViewModel, choiceInfo: ChoiceInfo);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(viewModel: ParticlesViewModel): ICommand;
}

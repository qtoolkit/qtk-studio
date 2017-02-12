import { MainModel } from "../models/main-model";
import { ICommand } from "qtk";
export declare class CommandProjectSettings implements ICommand {
    protected model: MainModel;
    canExecute(): boolean;
    execute(args: any): boolean;
    constructor(model: MainModel);
    static create(model: MainModel): ICommand;
}

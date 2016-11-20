import { ICommand } from "qtk";
export declare class CommandDraw implements ICommand {
    protected _canvas: any;
    constructor(canvas: any);
    canExecute(): boolean;
    execute(args: any): boolean;
    static create(canvas: any): ICommand;
}

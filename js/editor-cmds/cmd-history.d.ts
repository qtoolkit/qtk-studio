import { Emitter } from "qtk";
import { ICmdEdit } from "./cmd-edit";
export declare class CmdHistory extends Emitter {
    private redoCmds;
    private undoCmds;
    private changeEvent;
    constructor();
    reset(): void;
    notifyChange(): void;
    exec(cmd: ICmdEdit): boolean;
    canRedo(): boolean;
    redo(): boolean;
    canUndo(): boolean;
    undo(): boolean;
    static create(): CmdHistory;
}

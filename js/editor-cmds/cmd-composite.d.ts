import { ICmdEdit } from "./cmd-edit";
export declare class CmdComposite implements ICmdEdit {
    private cmds;
    constructor();
    add(cmd: ICmdEdit): CmdComposite;
    doit(): boolean;
    undo(): boolean;
    dispose(): void;
    static create(): CmdComposite;
}

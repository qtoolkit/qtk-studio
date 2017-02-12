import {ICmdEdit} from "./cmd-edit";

export class CmdComposite implements ICmdEdit {
    private cmds : Array<ICmdEdit>;

    constructor() {
        this.cmds = [];
    }

    public add(cmd:ICmdEdit) : CmdComposite {
        this.cmds.push(cmd);

        return this;
    }

    public doit() : boolean {
        this.cmds.forEach((cmd:ICmdEdit) => cmd.doit());

        return true;
    }

    public undo() : boolean {
        this.cmds.forEach((cmd:ICmdEdit) => cmd.undo());

        return true;
    }

    public dispose() {
        this.cmds.forEach((cmd:ICmdEdit) => cmd.dispose());
    }
    
    public static create() {
        return new CmdComposite();
    }
}
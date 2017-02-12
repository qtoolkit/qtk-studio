
import {Emitter, Events} from "qtk";
import {ICmdEdit} from "./cmd-edit";

export class CmdHistory extends Emitter {
    private redoCmds : Array<ICmdEdit>;
    private undoCmds : Array<ICmdEdit>;
    private changeEvent : Events.ChangeEvent;

    public constructor() {
        super();
        this.reset();
        this.changeEvent = Events.ChangeEvent.create();
        this.changeEvent.init(Events.CHANGE, {});
    }

    public reset() {
        this.redoCmds = [];
        this.undoCmds = [];
        this.removeAllListeners();
    }

    public notifyChange() {
        this.dispatchEvent(this.changeEvent);
    }

    public exec(cmd:ICmdEdit) : boolean {
        this.undoCmds.push(cmd);
        var ret = cmd.doit();
        this.notifyChange();

        return ret; 
    }
    
    public canRedo() : boolean {
        return this.redoCmds.length > 0
    }

    public redo() : boolean {
        var ret = false;
        var cmd = this.redoCmds.pop();
        if(cmd) {
            this.undoCmds.push(cmd);
            ret = cmd.doit();
            this.notifyChange();
        }

        return ret;
    }
    
    public canUndo() : boolean {
        return this.undoCmds.length > 0
    }

    public undo() : boolean {
        var ret = false;
        var cmd = this.undoCmds.pop();
        if(cmd) {
            this.redoCmds.push(cmd);
            ret = cmd.undo();
            this.notifyChange();
        }

        return ret;
    }

    public static create() : CmdHistory {
        return new CmdHistory();
    }
}
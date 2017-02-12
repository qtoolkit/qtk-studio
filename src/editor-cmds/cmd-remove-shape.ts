import {ICmdEdit} from "./cmd-edit";
import {IShape} from "../shapes/shape"
import {GroupShape} from "../shapes/group-shape";

export class CmdRemoveShape implements ICmdEdit {
    private shape : IShape;
    private parent : GroupShape;

    constructor(parent:GroupShape, shape:IShape) {
        this.shape = shape;
        this.parent = parent;
    }

    public doit() : boolean {
        this.parent.removeShape(this.shape);

        return true;
    }

    public undo() : boolean {
        this.parent.addShape(this.shape);

        return true;
    }

    public dispose() {
        this.shape = null;
        this.parent = null;
    }
    
    public static create(parent:GroupShape, shape:IShape) {
        return new CmdRemoveShape(parent, shape);
    }
}
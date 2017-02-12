import {ICmdEdit} from "./cmd-edit";
import {RectShape} from "../shapes/rect-shape"

export class CmdMoveResize implements ICmdEdit {
    private x : number;
    private y : number;
    private w : number;
    private h : number;

    private xOld : number;
    private yOld : number;
    private wOld : number;
    private hOld : number;
    private shape : RectShape;

    constructor(shape:RectShape) {
        this.xOld = shape.xSave;
        this.yOld = shape.ySave;
        this.wOld = shape.wSave;
        this.hOld = shape.hSave;

        this.x = shape.x; 
        this.y = shape.y; 
        this.w = shape.w; 
        this.h = shape.h; 
        this.shape = shape;
    }

    public doit() : boolean {
        this.shape.moveResize(this.x, this.y, this.w, this.h);

        return true;
    }

    public undo() : boolean {
        this.shape.moveResize(this.xOld, this.yOld, this.wOld, this.hOld);
        
        return true;
    }

    public dispose() {
        this.shape = null;
    }
    
    public static create(shape:RectShape) {
        return new CmdMoveResize(shape);
    }
}

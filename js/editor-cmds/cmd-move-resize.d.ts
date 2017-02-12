import { ICmdEdit } from "./cmd-edit";
import { RectShape } from "../shapes/rect-shape";
export declare class CmdMoveResize implements ICmdEdit {
    private x;
    private y;
    private w;
    private h;
    private xOld;
    private yOld;
    private wOld;
    private hOld;
    private shape;
    constructor(shape: RectShape);
    doit(): boolean;
    undo(): boolean;
    dispose(): void;
    static create(shape: RectShape): CmdMoveResize;
}

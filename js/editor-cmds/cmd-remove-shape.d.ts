import { ICmdEdit } from "./cmd-edit";
import { IShape } from "../shapes/shape";
import { GroupShape } from "../shapes/group-shape";
export declare class CmdRemoveShape implements ICmdEdit {
    private shape;
    private parent;
    constructor(parent: GroupShape, shape: IShape);
    doit(): boolean;
    undo(): boolean;
    dispose(): void;
    static create(parent: GroupShape, shape: IShape): CmdRemoveShape;
}

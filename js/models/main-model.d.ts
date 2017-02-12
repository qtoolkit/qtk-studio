import { ICmdEdit } from "../editor-cmds/cmd-edit";
import { CmdHistory } from "../editor-cmds/cmd-history";
import { Events, Rect } from "qtk";
import { ShapeManager } from "../shapes/shape-manager";
export declare class MainModel extends ShapeManager {
    view: any;
    cmdHistory: CmdHistory;
    selectingRect: Rect;
    doDraw(ctx: CanvasRenderingContext2D): void;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    docName: string;
    saveToJson(): any;
    loadFromJson(json: any): void;
    execCmd(cmd: ICmdEdit): boolean;
    constructor();
    static create(): MainModel;
}

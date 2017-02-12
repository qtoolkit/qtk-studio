import { Events, Widget, Resizable } from "qtk";
export declare class Editable extends Resizable {
    static TYPE: string;
    protected static MOVE: string;
    protected testPointerPosition(evt: Events.PointerEvent): string;
    protected onPointerMove(evt: Events.PointerEvent): void;
    protected afterWidgetDraw(evt: Events.DrawEvent): void;
    constructor(widget: Widget, options: any);
    protected dispose(): void;
    private afterDrawFunc;
}

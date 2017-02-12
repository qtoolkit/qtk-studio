import { IShape } from "../shapes/shape";
import { RectShape } from "./rect-shape";
import { Widget } from "qtk";
/**
 * WidgetShape
 */
export declare class WidgetShape extends RectShape {
    widget: Widget;
    moveResize(x: number, y: number, w: number, h: number): RectShape;
    doDraw(ctx: CanvasRenderingContext2D): void;
    toJson(): any;
    fromJson(json: any): IShape;
    static TYPE: string;
    static create(): WidgetShape;
}

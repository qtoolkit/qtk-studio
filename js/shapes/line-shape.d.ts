import { IShape, Shape, ShapeStyle } from "./shape";
import { Point, Events, Rect } from "qtk";
export declare enum ArrowType {
    NONE = 0,
    NORMAL = 1,
    DIAMON = 2,
    TRIANGLE = 3,
    FILLED_DIAMON = 4,
    FILLED_TRIANGLE = 5,
}
export declare class LineShapeStyle extends ShapeStyle {
    lineStyle: number;
    firstArrow: ArrowType;
    secondArrow: ArrowType;
    constructor();
    static create(json?: any): LineShapeStyle;
}
export declare class LineShape extends Shape {
    isRect: boolean;
    isLine: boolean;
    style: LineShapeStyle;
    points: Array<Point>;
    constructor(type?: string);
    isInRect(rect: Rect): boolean;
    toJson(): any;
    fromJson(json: any): IShape;
    draw(ctx: CanvasRenderingContext2D): void;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    static TYPE: string;
    static create(): LineShape;
}

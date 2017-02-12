import { Events, Rect, Point } from "qtk";
import { IShape, Shape, HitTestResult, ShapeStyle } from "./shape";
/**
 * Rect类Shape的外观效果参数
 */
export declare class RectShapeStyle extends ShapeStyle {
    /**
     * 圆角半径。
     */
    roundRadius: number;
    /**
     * 填充颜色。
     */
    fillColr: string;
    constructor();
    static create(json?: any): RectShapeStyle;
}
export declare class RectShape extends Shape {
    isRect: boolean;
    isLine: boolean;
    type: string;
    style: RectShapeStyle;
    /**
     * 位置的X坐标。
     */
    x: number;
    /**
     * 位置的Y坐标。
     */
    y: number;
    /**
     * 宽度。
     */
    w: number;
    /**
     * 高度。
     */
    h: number;
    /**
     * 为了支持编辑时可以撤销，在开始编辑时保存位置和大小。
     */
    xSave: number;
    ySave: number;
    wSave: number;
    hSave: number;
    constructor(type?: string);
    /**
     * 设置位置和大小。
     */
    moveResize(x: number, y: number, w: number, h: number): RectShape;
    isInRect(rect: Rect): boolean;
    toJson(): any;
    fromJson(json: any): IShape;
    /**
     * 对于被选中的Shape，绘制其中一个可点击的特殊点的标记。
     * 当前被点击的点的标记稍微大一点点。
     */
    drawOneHitTestMark(ctx: CanvasRenderingContext2D, hitTestResult: HitTestResult): void;
    /**
     * 对于被选中的Shape，绘制可点击的特殊点的标记。
     */
    drawHitTestMarks(ctx: CanvasRenderingContext2D): void;
    /**
     * 绘制选择框和特殊点的标记。
     */
    drawSelectedBox(ctx: CanvasRenderingContext2D): void;
    /**
     * 绘制Shape本身。
     */
    doDraw(ctx: CanvasRenderingContext2D): void;
    /**
     * 绘制。
     */
    draw(ctx: CanvasRenderingContext2D): void;
    /**
     * 获取指定特殊点的位置坐标。
     */
    getPointByHitResult(hitTestResult: HitTestResult): Point;
    /**
     * 判断指定点所在的区域。
     */
    hitTest(x: number, y: number): HitTestResult;
    /**
     * 保存当前的位置和大小。
     */
    saveXYWH(): RectShape;
    /**
     * 增量的修改位置和大小。
     */
    moveResizeDelta(hitTestResult: HitTestResult, dx: number, dy: number): RectShape;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    static MIN_SIZE: number;
    static TYPE: string;
    static supportedHitTestResult: HitTestResult[];
    static create(): RectShape;
}

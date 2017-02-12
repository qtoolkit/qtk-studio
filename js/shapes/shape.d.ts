import { Events, Emitter, Rect } from "qtk";
import { ICmdEdit } from "../editor-cmds/cmd-edit";
/**
 * Shape的外观效果参数。
 */
export declare class ShapeStyle {
    /**
     * 线条宽度。
     */
    lineWidth: number;
    /**
     * 线条颜色，兼容CSS的颜色参数，如"rgba(123,123,123,0.5)", "#ffffff", "gold"。
     */
    lineColor: string;
    /**
     * 文字的颜色，兼容CSS的颜色参数。
     */
    textColor: string;
    /**
     * 字体的大小。单位为像素(px)。
     */
    fontSize: number;
    /**
     * 字体簇。
     */
    fontFamily: string;
    /**
     * 文字使用粗体。
     */
    bold: boolean;
    /**
     * 文字使用斜体。
     */
    italic: boolean;
    /**
     * 文字使用下划线。
     */
    underline: boolean;
    /**
     * 字体。由其它参数组合而成，目前不支持设置。
     */
    font: string;
    constructor();
    /**
     * 把当前对象的属性存到一个JSON对象中。
     */
    toJson(): any;
    /**
     * 从JSON对象初始化当前的对象的属性。
     */
    fromJson(json: any): ShapeStyle;
}
/**
 * 点击测试的结果。
 */
export declare enum HitTestResult {
    /**
     * 没有点击到Shape。
     */
    NONE = 0,
    /**
     * 点击到左上角。
     */
    TL = 1,
    /**
     * 点击到上方中间点。
     */
    TM = 2,
    /**
     * 点击到右上角。
     */
    TR = 3,
    /**
     * 点击到左方中间点。
     */
    ML = 4,
    /**
     * 点击到右方中间点。
     */
    MR = 5,
    /**
     * 点击到Shape上，但不在任何特殊点上。
     */
    MM = 6,
    /**
     * 点击到左下角。
     */
    BL = 7,
    /**
     * 点击到下方中间点。
     */
    BM = 8,
    /**
     * 点击到右下角。
     */
    BR = 9,
    /**
     * 点击到点1。
     */
    P1 = 10,
    /**
     * 点击到点2。
     */
    P2 = 11,
    /**
     * 点击到点3。
     */
    P3 = 12,
    /**
     * 点击到点4。
     */
    P4 = 13,
    /**
     * 点击到点5。
     */
    P5 = 14,
    /**
     * 点击到点6。
     */
    P6 = 15,
}
/**
 * Shape接口，任何Shape都需实现IShape接口。
 * Shape代表任意的图形，通常有两类：一类是面，如矩形，圆形和菱形等。另外一类是线条，可以是直线，曲线和多条线的组合。
 */
export interface IShape {
    /**
     * ID是Shape唯一标识，在Shape创建时自动生成，一般情况不要修改它。
     */
    id: string;
    /**
     * Shape的名称。
     */
    name: string;
    /**
     * Shape的类型，是该Shape实现类的名称，可以用ShapeFactory创建Shape对象。
     */
    type: string;
    /**
     * 标识当前shape是否被选中，以及被选中的时间。在编辑器中拷贝/剪切/删除/对齐等操作都会用到它。
     */
    selected: number;
    /**
     * 标识当前shape是否是矩形类Shape，目前矩形、菱形和圆形都归于矩形类Shape，它们都由四个点来决定大小和位置。
     * 只有矩形类Shape才具有对齐等行为。
     */
    isRect: boolean;
    /**
     * 标识当前shape是否是线条类Shape。
     */
    isLine: boolean;
    /**
     * Shape的外观效果参数。
     */
    style: ShapeStyle;
    /**
     * Shape上显示的文本。
     */
    text: string;
    /**
     * 当前指针设备(如鼠标)点击的位置。
     */
    hitTestResult: HitTestResult;
    /**
     * 指向父Shape的引用。
     */
    parent: IShape;
    /**
     * 判断Shape是否在指定的Rect内。
     */
    isInRect(rect: Rect): boolean;
    /**
     * 点击测试。判读指定点在当前Shape上的位置。
     */
    hitTest(x: number, y: number): HitTestResult;
    /**
     * 把当前对象的属性存到一个JSON对象中。
     */
    toJson(): any;
    /**
     * 从JSON对象初始化当前的对象的属性。
     */
    fromJson(json: any): IShape;
    /**
     * 执行一个编辑命令，并返回执行结果。
     * 为了让所有的编辑操作都可以撤销和重做，编辑操作都由本函数统一执行，方便记录执行历史。
     */
    execCmd(cmd: ICmdEdit): boolean;
    /**
     * 通知关注者Shape的属性有变化，这样关注者可以执行相应的动作，如View重绘等。
     */
    notifyChange(): any;
    /**
     * 注册Shape的变化事件，Shape的属性有变化时会执行注册的回调函数func。
     */
    onChange(func: Function): any;
    /**
     * 注销Shape的变化事件。
     */
    offChange(func: Function): any;
    /**
     * 绘制当前Shape。
     */
    draw(ctx: CanvasRenderingContext2D): any;
    /**
     * 处理指针按下事件。
     */
    onPointerDown(evt: Events.PointerEvent): any;
    /**
     * 处理指针移动事件。
     */
    onPointerMove(evt: Events.PointerEvent): any;
    /**
     * 处理指针抬起事件。
     */
    onPointerUp(evt: Events.PointerEvent): any;
}
export declare class Shape extends Emitter implements IShape {
    id: string;
    name: string;
    text: string;
    type: string;
    selected: number;
    isRect: boolean;
    isLine: boolean;
    style: ShapeStyle;
    hitTestResult: HitTestResult;
    parent: IShape;
    /**
     * 选择点的大小。
     */
    static POINT_SIZE: number;
    private changeEvent;
    /**
     * 判断点(x2, y2)是否在点(x1, y1)附近。
     */
    isNearBy(x1: number, y1: number, x2: number, y2: number): boolean;
    isInRect(rect: Rect): boolean;
    hitTest(x: number, y: number): HitTestResult;
    notifyChange(): void;
    onChange(func: Function): void;
    offChange(func: Function): void;
    constructor(type?: string);
    toJson(): any;
    fromJson(json: any): IShape;
    draw(ctx: CanvasRenderingContext2D): void;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    execCmd(cmd: ICmdEdit): boolean;
}

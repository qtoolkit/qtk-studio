import { Events, Rect } from "qtk";
import { RectShape } from "./rect-shape";
import { IShape } from "./shape";
/**
 * GroupShape可以容纳其它Shape，通过addShape/removeShape等函数管理其中的Shapes。
 */
export declare class GroupShape extends RectShape {
    /**
     * 其容纳的子Shapes。
     */
    shapes: Array<IShape>;
    /**
     * 当前的接受指针事件和按键事件的Shape。
     */
    target: IShape;
    private selectedRectShapes;
    constructor(type?: string);
    /**
     * 通过名称查找其容纳的子Shapes。
     */
    findChildByName(name: string): IShape;
    /**
     * 通过ID查找其容纳的子Shapes。
     */
    findChildByID(id: string): IShape;
    /**
     * 增加一个shape
     */
    addShape(shape: IShape): GroupShape;
    /**
     * 删除全部Shapes。
     */
    removeAllShapes(): GroupShape;
    /**
     * 删除指定的Shape。
     */
    removeShape(shape: IShape): GroupShape;
    /**
     * 统计被选中的Shapes的个数。
     */
    countSelectedShapes(): number;
    /**
     * 将全部shapes设置为非选中状态。
     */
    selectNone(): GroupShape;
    /**
     * 将全部shapes设置为选中状态。
     */
    selectAll(): GroupShape;
    /**
     * 选中指定区域的Shapes
     */
    selectShapesInRect(rect: Rect): GroupShape;
    /**
     * 选中/反选指定Shape。
     */
    selectShape(target: any, exclude: boolean): GroupShape;
    /**
     * 获取当前被选中的Shapes。
     */
    getSelectedShapes(sort: boolean): Array<IShape>;
    /**
     * 获取当前被选中的Rect Shapes。
     */
    getSelectedRectShapes(sort: boolean): Array<RectShape>;
    toJson(): any;
    fromJson(arr: Array<any>): GroupShape;
    /**
     * 查找指定位置处的Shape，如果有多个取最上层的一个。
     */
    findShapeByPoint(x: number, y: number): IShape;
    /**
     * 转换指针事件的localX/localY为相对于当前shape的。
     */
    translatePointEvent(evt: Events.PointerEvent): GroupShape;
    /**
     * 恢复指针事件的localX/localY。
     */
    untranslatePointEvent(evt: Events.PointerEvent): GroupShape;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    onClick(evt: Events.PointerEvent): void;
    static create(): GroupShape;
}

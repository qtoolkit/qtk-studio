import { Events } from "qtk";
import { GroupShape } from "./group-shape";
/**
 * Shape管理器，在GroupShape提供了一些编辑功能。
 */
export declare class ShapeManager extends GroupShape {
    /**
     * 剪切板，保存拷贝的shapes的JSON数据。
     */
    clipBoard: any;
    constructor();
    /**
     * 剪切选中的shapes。
     */
    cut(): void;
    /**
     * 拷贝选中的shapes。
     */
    copy(): void;
    /**
     * 删除选中的shapes。
     */
    del(): void;
    /**
     * 删除选中的shapes。
     */
    removeSelectedShapes(): GroupShape;
    /**
     * 粘贴。用剪切板中的JSON创建shapes，并加入到当前shape中。
     */
    paste(): void;
    /**
     * 检查是否可以粘贴。
     */
    canPaste(): boolean;
    /**
     * 用指定的方式对齐当前被选中的Rect Shapes。
     */
    align(doAlign: Function): boolean;
    /**
     * 让当前被选中的Rect Shapes在垂直方向上均匀分布。
     */
    alignDistV(): boolean;
    /**
     * 让当前被选中的Rect Shapes在水平方向上均匀分布。
     */
    alignDistH(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的左边为基准对齐。
     */
    alignLeft(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的水平中心为基准对齐。
     */
    alignCenter(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的顶部为基准对齐。
     */
    alignTop(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的垂直中心为基准对齐。
     */
    alignMiddle(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的右边为基准对齐。
     */
    alignRight(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape的底部为基准对齐。
     */
    alignBottom(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的宽度。
     */
    alignToSameWidth(): boolean;
    /**
     * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的高度。
     */
    alignToSameHeight(): boolean;
    doDraw(ctx: CanvasRenderingContext2D): void;
    draw(ctx: CanvasRenderingContext2D): void;
    onPointerDown(evt: Events.PointerEvent): void;
    onPointerMove(evt: Events.PointerEvent): void;
    onPointerUp(evt: Events.PointerEvent): void;
    static create(): ShapeManager;
}

import { MainModel } from "../models/main-model";
import { MainViewModel } from "../view-models/main-view-model";
import { Style, Widget, Events } from "qtk";
export declare class DesignView extends Widget {
    static TYPE: string;
    protected dragging: boolean;
    constructor();
    protected model: MainModel;
    protected viewModel: MainViewModel;
    protected readonly designWidth: number;
    protected readonly designHeight: number;
    activate(): void;
    dispatchClick(evt: Events.PointerEvent): void;
    dispatchPointerDown(evt: Events.PointerEvent): void;
    dispatchPointerMove(evt: Events.PointerEvent): void;
    dispatchPointerUp(evt: Events.PointerEvent): void;
    dispatchKeyUp(evt: Events.KeyEvent): void;
    protected doDraw(ctx: any, style: Style): void;
    private createWidgetAt(info, x, y);
    onDeinit(): void;
    static create(options: any): DesignView;
}

import { DrawInfo } from "../models/draw-info";
import { IViewModel, Widget, Style } from "qtk";
export declare class ParticlesView extends Widget {
    protected _style: Style;
    protected viewModel: IViewModel;
    protected _drawInfo: DrawInfo;
    protected drawBackground(ctx: any, style: Style): Widget;
    getStyle(): Style;
    constructor();
    static TYPE: string;
    static create(options: any): ParticlesView;
}

import { Rect } from "qtk";
export declare class DrawInfo {
    ctx: any;
    rect: Rect;
    init(ctx: any, rect: Rect): void;
    static create(): DrawInfo;
}

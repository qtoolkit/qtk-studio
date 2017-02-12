import { IShape } from "./shape";
export declare class ShapeFactory {
    static categories: {};
    static creators: {};
    static unregisterCreator(type: string, category: string): boolean;
    static registerCreator(type: string, category: string, creator: Function): boolean;
    static createWithJson(json: any): IShape;
}

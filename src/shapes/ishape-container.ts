import {IShape} from "./shape";

export interface IShapeContainer {
    addShape(shape:IShape);
    removeShape(shape:IShape);
    children : Array<IShape>;
}
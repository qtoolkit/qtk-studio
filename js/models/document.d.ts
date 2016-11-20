import { IDocument } from "./idocument";
import { PagePropsDesc } from "qtk";
export declare class Document implements IDocument {
    data: any;
    propsDesc: Array<PagePropsDesc>;
    toJson(): any;
    fromJson(json: any): Document;
    fromTemplate(name: string): Document;
    getTemplateList(): Array<string>;
    static create(): Document;
    static templates: {};
    static templateNames: any[];
    static registerTemplate(name: string, json: any): void;
    static getTemplateList(): Array<string>;
}

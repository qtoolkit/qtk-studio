import { PagePropsDesc } from "qtk";
export interface IDocument {
    data: any;
    propsDesc: Array<PagePropsDesc>;
    toJson(): any;
    fromJson(json: any): IDocument;
    fromTemplate(name: string): IDocument;
    getTemplateList(): Array<string>;
}

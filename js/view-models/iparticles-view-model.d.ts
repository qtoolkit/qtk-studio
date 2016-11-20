import { IViewModel } from "qtk";
import { PagePropsDesc } from "qtk";
export interface IParticlesViewModel extends IViewModel {
    getPropsDesc(): Array<PagePropsDesc>;
    getDocList(): Array<string>;
    getFormatList(): Array<string>;
    getDocName(): string;
    openDoc(fileName: string): any;
    saveDoc(fileName: string): any;
    createDoc(templateName: string): any;
    removeDoc(fileName: string): any;
    exportDoc(format: string): string;
    getPropTitleWidth(): string;
    saveTemp(): any;
    loadTemp(): any;
}
export declare class ParticlesViewModelFactory {
    static viewModels: any;
    static register(type: string, creator: Function): void;
    static create(type: string, options?: any): IParticlesViewModel;
}

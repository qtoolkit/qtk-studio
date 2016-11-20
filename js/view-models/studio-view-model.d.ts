import { ViewModel } from "qtk";
export declare class StudioViewModel extends ViewModel {
    constructor(data: any);
    private initCommands();
    removeDoc(fileName: string): void;
    saveDoc(fileName: string): void;
    openDoc(fileName: string): void;
    getDocList(): Array<string>;
    static create(data: any): StudioViewModel;
}

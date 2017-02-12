import { MainModel } from "../models/main-model";
import { TabControl, TabPage } from "qtk";
export declare class MainTabControl extends TabControl {
    closePage(page: TabPage): void;
    renamePageByModel(model: MainModel): void;
    activatePageByModel(model: MainModel): void;
    static TYPE: string;
    static create(options: any): MainTabControl;
}

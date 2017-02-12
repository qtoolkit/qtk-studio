import { IViewModel, ToolBar } from "qtk";
export declare class MainToolBar extends ToolBar {
    protected viewModel: IViewModel;
    protected getIconURL(name: string): string;
    protected getDisableIconURL(name: string): string;
    protected createItems(cmdsDesc: any): void;
    protected onInit(): void;
    static TYPE: string;
    static create(options: any): MainToolBar;
}

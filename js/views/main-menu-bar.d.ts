import { MenuBar, Menu, IViewModel } from "qtk";
export declare class MainMenuBar extends MenuBar {
    protected viewModel: IViewModel;
    protected onFileMenu(menu: Menu): void;
    protected onHelpMenu(menu: Menu): void;
    protected onCreated(): void;
    static create(options: any): MainMenuBar;
}

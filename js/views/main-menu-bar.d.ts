import { IViewModel, MenuBar, Menu, MenuItem } from "qtk";
export declare class MainMenuBar extends MenuBar {
    protected viewModel: IViewModel;
    protected addShortcut(key: string, command: string): void;
    protected addMenuItem(menu: Menu, text: string, key: string, command: string): MenuItem;
    protected addShortcuts(cmdsDesc: any): void;
    protected createMenu(cmdsDesc: any): void;
    protected onInit(): void;
    static create(options: any): MainMenuBar;
}

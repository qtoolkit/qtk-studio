import { Group, IViewModel } from "qtk";
export declare class MainToolBar extends Group {
    protected viewModel: IViewModel;
    protected addButton(command: string, tips: string): void;
    protected onCreated(): void;
    static create(options: any): MainToolBar;
}

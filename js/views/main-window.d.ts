import { IViewModel, WindowNormal } from "qtk";
export declare class MainWindow extends WindowNormal {
    protected viewModel: IViewModel;
    protected onCreated(): void;
    static create(options: any): MainWindow;
}

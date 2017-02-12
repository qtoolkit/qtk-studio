import { MainTabControl } from "./main-tab-control";
import { MainViewModel } from "../view-models/main-view-model";
import { WindowNormal } from "qtk";
export declare class MainWindow extends WindowNormal {
    protected viewModel: MainViewModel;
    protected tabControl: MainTabControl;
    protected createNewTab(): void;
    protected onCreated(): void;
    static create(options: any): MainWindow;
}

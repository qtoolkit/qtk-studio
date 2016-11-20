import { MainWindow } from "./views/main-window";
import { Application } from "qtk";
import { IParticlesViewModel } from "./view-models/iparticles-view-model";
export declare class ParticlesEditor extends Application {
    mainWindow: MainWindow;
    protected _viewModelName: string;
    constructor(appName: string, viewModelName: string);
    protected getViewModelName(): string;
    protected createViewModel(): IParticlesViewModel;
    onReady(): void;
    static run(appName: string, viewModelName: string): ParticlesEditor;
}

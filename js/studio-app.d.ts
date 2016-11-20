import { Application } from "qtk";
import { StudioViewModel } from "./view-models/studio-view-model";
export declare class StudioApp extends Application {
    protected createViewModel(): StudioViewModel;
    onReady(): void;
    static run(): StudioApp;
}

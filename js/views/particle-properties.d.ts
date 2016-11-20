import { PropertySheets, Style } from "qtk";
import { IParticlesViewModel } from "../view-models/iparticles-view-model";
export declare class ParticleProperties extends PropertySheets {
    protected _style: Style;
    protected viewModel: IParticlesViewModel;
    getStyle(): Style;
    protected createUI(): void;
    protected onCreated(): void;
    static TYPE: string;
    static create(options: any): ParticleProperties;
}

export interface ICmdEdit {
    doit(): boolean;
    undo(): boolean;
    dispose(): any;
}

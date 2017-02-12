import { ListItem, TitleContent } from "qtk";
export declare class ControlsListView extends TitleContent {
    constructor();
    protected createTemplateItem(): ListItem;
    private hookItem(item);
    private initContent();
    static create(options: any): ControlsListView;
}

import { ListItem, TitleContent } from "qtk";
export declare class ComponentListView extends TitleContent {
    constructor();
    protected createTemplateItem(): ListItem;
    private hookItem(item);
    private initContent();
    TYPE: string;
    static create(options: any): ComponentListView;
}

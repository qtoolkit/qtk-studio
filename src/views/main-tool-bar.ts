import {MainCmdsDesc} from "./main-cmds-desc"
import {IViewModel, Align, Group, ToolBar, ToolBarItem} from "qtk";
import {ImageTile, Style, Events, Widget, ImageDrawType, LinearLayouter, LinearLayouterParam, WidgetRecyclableCreator} from "qtk";

export class MainToolBar extends ToolBar {
    protected viewModel : IViewModel

    protected getIconURL(name:string) : string {
        return "assets/icons/@density/"+name+".png";
    } 

    protected getDisableIconURL(name:string) : string {
        return "assets/icons/@density/"+name+"-disable.png";
    } 

    protected createItems(cmdsDesc:any) {
        for(var categeory in cmdsDesc) {
            var items = cmdsDesc[categeory];
            for(var cmd in items) {
                var desc = items[cmd];
                if(desc.toolbar) {
                    if(desc.icon) {
                        var normalIconURL = this.getIconURL(desc.icon);
                        var disableIconURL = this.getDisableIconURL(desc.icon);
                        this.addItem(desc.command, desc.text, desc.tips, normalIconURL, disableIconURL);
                    }else{
                        this.addSpacer(desc.w || 10);
                    }
                }
            }
            this.addSpacer(10);
        }
    } 

    protected onInit() {
        super.onInit();
        this.createItems(MainCmdsDesc);
        this.bindData(this.viewModel);
    }

    public static TYPE = "main-tool-bar";
    public static create(options:any) {
        var bar = new MainToolBar(MainToolBar.TYPE);
        bar.reset(MainToolBar.TYPE, options);
        bar.styleType = ToolBar.TYPE;

        return bar;
    }
};

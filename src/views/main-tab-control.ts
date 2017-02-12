import {MainModel} from "../models/main-model";
import {TabControl, TabPage, Widget, InteractionRequest, ConfirmationInfo} from "qtk";

export class MainTabControl extends TabControl {
    public closePage(page:TabPage) {
        var info = ConfirmationInfo.create("Are you sure to close this page?", 300);
        InteractionRequest.confirm(info, (ret) => {
            if(ret.confirmed) {
                this.removePage(page, true);
            }
        });
        console.log("closePage");
    }

    public renamePageByModel(model:MainModel) {
       var docName = model.docName;
       var page = model.view.getParentByType(TabPage.TYPE);

       this.setPageTitle(<TabPage>page, docName);
    }

    public activatePageByModel(model:MainModel) {
        var designView = model.view;
        this.activePage = <TabPage>designView.getParentByType(TabPage.TYPE);
    }

    public static TYPE = "main-tab-control";
    public static create(options:any) : MainTabControl {
        var tabControl = new MainTabControl();
        tabControl.reset(MainTabControl.TYPE, options);
        
        return tabControl;
    }
}
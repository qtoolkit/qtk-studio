import {WidgetState} from "qtk";
import {Widget, Events, Label, ListItem, ListView, TitleContent, Graphics, Rect, Style} from "qtk";

import {ControlsModel} from "../models/controls-model"
import {ControlsViewModel} from "../view-models/controls-view-model";

export class ComponentListView extends TitleContent {
    constructor() {
        super();
    }

	protected createTemplateItem() {
		var dataBindingRule = {
			text: {path:"text"},
			userData : {path:"info"}
		};

		var item = ListItem.create({dataBindingRule:dataBindingRule});
        item.useBehavior("draggable", {});
        
        return item;
	}

    private hookItem(item:Widget) {
        item.on(Events.DRAGSTART, function(evt) {
            var image = {
                draw : function(ctx, x, y) {
                    var rect = Rect.create(x, y, 128, 30);

                    ctx.fillStyle = "gold";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
                    Graphics.drawTextSL(ctx, item.text, item.getStyle(), rect);
                }
            }

            evt.dataTransfer.setDragImage(image);
            evt.dataTransfer.setData("text/plain", item.userData);
        });

        item.on(Events.DRAGEND, function(evt) {
            console.log("DRAGEND");
        });
    }

    private initContent() {
        this.contentWidget = ListView.create({
            itemH : 36,
            templateItem : this.createTemplateItem()
        });

        this.titleWidget = Label.create({text:"Controls palette", styleType:"dialog.title-bg"});
        this.contentWidget.bindData(ControlsViewModel.create(ControlsModel.create()));

        this.contentWidget.children.forEach((item:Widget) => {
            this.hookItem(item);
        });
    }

    public TYPE = "component-list-view";
    public static create(options:any) {
        var view = new ComponentListView();
        view.reset(ComponentListView.TYPE, options);
        view.initContent();

        return view;
    }
}
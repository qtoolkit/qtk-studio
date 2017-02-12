
import {Editable} from "../behaviors/editable"
import {MainModel} from "../models/main-model";
import {RectShape} from "../shapes/rect-shape";
import {ShapeFactory} from "../shapes/shape-factory";
import {MainViewModel} from "../view-models/main-view-model";
import {KeyEvent, Style, Point, Rect, Widget, Events, WidgetFactory, MatrixStack} from "qtk";

import {CmdAddShape} from "../editor-cmds/cmd-add-shape";

export class DesignView extends Widget {
    public static TYPE = "design-view";
    
    protected dragging : boolean;

    constructor() {
        super(DesignView.TYPE);
    }

    protected model : MainModel;
    protected viewModel : MainViewModel;

    protected get designWidth() : number {
        return this.model.w;
    }
    protected get designHeight() : number {
        return this.model.h;
    }

    public activate() {
        this.viewModel.model = this.model;
    }

    public dispatchClick(evt:Events.PointerEvent) {
        this.model.onClick(evt);
    } 

    public dispatchPointerDown(evt:Events.PointerEvent) {
        super.dispatchPointerDown(evt);
        if(!this.dragging) {
            this.model.onPointerDown(evt);
        }
    }
    
    public dispatchPointerMove(evt:Events.PointerEvent) {
        super.dispatchPointerMove(evt);
        if(!this.dragging) {
            this.model.onPointerMove(evt);
        }
        if(evt.pointerDown) {
            this.requestRedraw();
        }
    }

    public dispatchPointerUp(evt:Events.PointerEvent) {
        super.dispatchPointerUp(evt);
        if(!this.dragging) {
            this.model.onPointerUp(evt);
        }
        this.requestRedraw();
    }

    public dispatchKeyUp(evt:Events.KeyEvent) {
        if(evt.keyCode === KeyEvent.VK_DELETE || evt.keyCode == KeyEvent.VK_BACK_SPACE) {
            this.model.removeSelectedShapes();
        }
    }

    protected doDraw(ctx:any, style:Style) {
        super.doDraw(ctx, style);
        var x = (this.w - this.designWidth) >> 1;
        var y = (this.h - this.designHeight) >> 1;

        this.model.draw(<CanvasRenderingContext2D>ctx);

        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "Gray";
        ctx.beginPath();
        
        ctx.rect(0, 0, this.w, y);
        ctx.rect(0, y+this.designHeight, this.w, this.h-y-this.designHeight);
        ctx.rect(0, y, x, this.designHeight);
        ctx.rect(x+this.designWidth, y, this.w-x-this.designWidth, this.designHeight);
        
        ctx.fill();
        ctx.restore();
    } 

    private createWidgetAt(info:any, x:number, y:number) {
        var p = this.toLocalPoint(Point.point.init(x, y));
        var json = JSON.parse(JSON.stringify(info));
        
        var shape:any = ShapeFactory.createWithJson(json); 
        
        shape.selected = Date.now();   
        if(shape.isRect) {
            shape.x = p.x;
            shape.y = p.y;
        }

        this.model.execCmd(CmdAddShape.create(this.model, shape));     
    }

    public onDeinit() {
        super.onDeinit();
        this.viewModel.removeModel(this.model);
    }

    public static create(options:any) {
        var view = new DesignView();
        view.reset(DesignView.TYPE, options);
        view.useBehavior("droppable", {});
        
        view.on(Events.DROP, function(evt) {
            var info:any = evt.dataTransfer.getData("text/plain");
            view.createWidgetAt(info, evt.x, evt.y);
            view.dragging = false;
        });

        view.on(Events.DRAGENTER, function(evt) {
            view.dragging = true;
        });
        view.on(Events.DRAGLEAVE, function(evt) {
            view.dragging = false;
        });
        
        view.viewModel = options.viewModel;
        view.model = view.viewModel.model;
        view.model.view = view;

       return view;
    }
}
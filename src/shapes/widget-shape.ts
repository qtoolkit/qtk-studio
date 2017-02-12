import {IShape} from "../shapes/shape"
import {ShapeFactory} from "./shape-factory"
import {RectShape, RectShapeStyle} from "./rect-shape"
import {Events, Emitter, Rect, Point, Widget, WidgetFactory, Application} from "qtk";

/**
 * WidgetShape
 */
export class WidgetShape extends RectShape {
    public widget : Widget;

    public moveResize(x:number, y:number, w:number, h:number) : RectShape {
        super.moveResize(x, y, w, h);
        this.widget.w = w;
        this.widget.h = h;

        return this;
    }

    public doDraw(ctx:CanvasRenderingContext2D) {
        if(this.widget) {
            ctx.save();
            ctx.translate(this.x, this.y);
            this.widget.draw(ctx);
            ctx.restore();
        }     
    }

    public toJson() : any { 
        var json = super.toJson();
        json.widgetInfo = this.widget.toJson();

        return json;
    }

    public fromJson(json:any) : IShape {
        super.fromJson(json);
        this.widget = WidgetFactory.createWithJson(json.widgetInfo);
        this.widget.app = Application.get();
        this.widget.w = this.w;
        this.widget.h = this.h;
        this.style.fillColr = "green";
        this.widget.init();
         
        return this;
    }

    public static TYPE = "widget";
    public static create() : WidgetShape {
        var shape = new WidgetShape();
        return shape;
    } 
}

ShapeFactory.registerCreator(WidgetShape.TYPE, "basic", WidgetShape.create);

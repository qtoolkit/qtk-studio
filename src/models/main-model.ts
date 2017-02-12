import {IShape} from "../shapes/shape";
import {ShapeFactory} from "../shapes/shape-factory";

import {ICmdEdit} from "../editor-cmds/cmd-edit"
import {CmdHistory} from "../editor-cmds/cmd-history"

import {Events, Rect, Widget, WidgetFactory} from "qtk";
import {ShapeManager} from "../shapes/shape-manager";

export class MainModel extends ShapeManager {
    public view : any;
    public cmdHistory : CmdHistory;
    public selectingRect : Rect;

	public doDraw(ctx:CanvasRenderingContext2D) {
        super.doDraw(ctx);
        var rect = this.selectingRect.normalize(Rect.rect);

        if(rect.w && rect.h) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "gold";
            ctx.rect(rect.x, rect.y, rect.w, rect.h);
            ctx.stroke();
        }
    }

	public onPointerDown(evt:Events.PointerEvent) {
        super.onPointerDown(evt);
        this.selectingRect.init(evt.localX, evt.localY, 0, 0);
    }

	public onPointerMove(evt:Events.PointerEvent) {
        super.onPointerMove(evt);
        var rect = this.selectingRect;
        if(evt.pointerDown && !this.target) {
            rect.w = evt.dx;
            rect.h = evt.dy;
            
            rect = rect.normalize(Rect.rect);
            this.selectShapesInRect(rect);
        }
    }

	public onPointerUp(evt:Events.PointerEvent) {
        super.onPointerUp(evt);
        var rect = this.selectingRect;
        rect.w = 0;
        rect.h = 0; 
    }

    public get docName() : string {
        return this.name;
    }
    public set docName(value:string) {
        this.name = value;
    }

	public saveToJson() : any {
        var doc = {
            magic : "shape-manager",
            version : "1.0.0",
            x : this.x,
            y : this.y,
            w : this.w,
            h : this.h,
            data : this.toJson()
        };

		return doc;
	}

	public loadFromJson(json:any) {
        this.x = json.x;
        this.y = json.y;
        this.w = json.w;
        this.h = json.h;

        this.fromJson(json.data);

		return;
	}

    public execCmd(cmd:ICmdEdit) : boolean {
        var ret = this.cmdHistory.exec(cmd);
        
        this.notifyChange();
        this.view.requestRedraw();

        return ret;
    }

	constructor() {
        super();
        this.x = 0;
        this.y = 0;
		this.w = 800;
		this.h = 600;
        this.cmdHistory = CmdHistory.create();
        this.selectingRect = Rect.create(0, 0, 0, 0);
        this.cmdHistory.on(Events.CHANGE, (evt:Events.ChangeEvent) => {
            this.view.requestRedraw();
        });
	}

	public static create() : MainModel{
		return new MainModel();
	}
};

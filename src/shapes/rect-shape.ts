import {ShapeFactory} from "./shape-factory";
import {Events, Emitter, Rect, Point} from "qtk";
import {CmdMoveResize} from "../editor-cmds/cmd-move-resize"
import {IShape, Shape, HitTestResult, ShapeStyle} from "./shape"

/**
 * Rect类Shape的外观效果参数
 */
export class RectShapeStyle extends ShapeStyle{
    /**
     * 圆角半径。
     */
	public roundRadius : number;
    /**
     * 填充颜色。
     */
	public fillColr    : string;

	constructor() {
		super();
		
		this.fillColr = "white";
		this.roundRadius = 0;
	}	

	public static create(json?:any) : RectShapeStyle {
		var style = new RectShapeStyle();
		if(json) {
			style.fromJson(json);	
		}
		
		return style;
	}
}

export class RectShape extends Shape {
    public isRect = true;
    public isLine = false;
	public type : string = RectShape.TYPE;
	public style  : RectShapeStyle;
    
    /**
     * 位置的X坐标。
     */
    public x : number;
    /**
     * 位置的Y坐标。
     */
    public y : number;
    /**
     * 宽度。
     */
    public w : number;
    /**
     * 高度。
     */
    public h : number;

    /**
     * 为了支持编辑时可以撤销，在开始编辑时保存位置和大小。
     */
    public xSave : number;
    public ySave : number;
    public wSave : number;
    public hSave : number;

    public constructor(type?:string) {
        super(type || RectShape.TYPE);
        this.x = 0;
        this.y = 0;
        this.w = 100;
        this.h = 100;
        this.style = RectShapeStyle.create(); 
    }

    /**
     * 设置位置和大小。
     */
    public moveResize(x:number, y:number, w:number, h:number) : RectShape {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        return this;
    }

	public isInRect(rect:Rect) : boolean {
        var cx = this.x + (this.w >> 1);
        var cy = this.y + (this.h >> 1);

		return rect.containsPoint(cx, cy);
	}

	public toJson() : any {
        return {
            id : this.id,
            name : this.name,
            type : this.type,
            isRect : true,
            isLine : false,
            style  : this.style.toJson(),
            x  : this.x,
            y  : this.y,
            w  : this.w,
            h  : this.h
        };
    }

	public fromJson(json:any) : IShape {
        for(var key in json) {
            var value = json[key];
            if(key === 'style') {
                this.style = RectShapeStyle.create(value);
            }else if(typeof value !== "object") {
                this[key] = value;
            }
        }

        return this;
    }

    /**
     * 对于被选中的Shape，绘制其中一个可点击的特殊点的标记。
     * 当前被点击的点的标记稍微大一点点。
     */
    public drawOneHitTestMark(ctx:CanvasRenderingContext2D, hitTestResult:HitTestResult) {
        var p = this.getPointByHitResult(hitTestResult);
        if(p) {
            var size = hitTestResult === this.hitTestResult ? Shape.POINT_SIZE+2 : Shape.POINT_SIZE;
            var x = p.x - size;
            var y = p.y - size;
            ctx.rect(x, y, size<<1, size<<1);
        }
    }

    /**
     * 对于被选中的Shape，绘制可点击的特殊点的标记。
     */
    public drawHitTestMarks(ctx:CanvasRenderingContext2D) {
        RectShape.supportedHitTestResult.forEach((value:HitTestResult) => {
            this.drawOneHitTestMark(ctx, value);
        });
    }

    /**
     * 绘制选择框和特殊点的标记。
     */
	public drawSelectedBox(ctx:CanvasRenderingContext2D) {
        if(this.selected) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'gold';
            ctx.rect(this.x, this.y, this.w, this.h);
            this.drawHitTestMarks(ctx);
            ctx.stroke();
        }
    }

    /**
     * 绘制Shape本身。
     */
	public doDraw(ctx:CanvasRenderingContext2D) {
        var style = this.style;
        ctx.lineWidth = style.lineWidth;
        ctx.fillStyle = style.fillColr;
        ctx.strokeStyle = style.lineColor;
        
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.fill();
        ctx.stroke();
    }

    /**
     * 绘制。
     */
	public draw(ctx:CanvasRenderingContext2D) {
        ctx.save();
        this.doDraw(ctx);
        this.drawSelectedBox(ctx);
        ctx.restore();
    }
	
    /**
     * 获取指定特殊点的位置坐标。
     */
    public getPointByHitResult(hitTestResult:HitTestResult) : Point {
        var x = 0;
        var y = 0;
        var xl = this.x;
        var yt = this.y;
        var xm = this.x + (this.w >> 1);
        var xr = this.x + this.w;
        var ym = this.y + (this.h >> 1);
        var yb = this.y + this.h;

        switch(hitTestResult) {
            case HitTestResult.TL : {
                x = xl;
                y = yt;
                break;
            }
            case HitTestResult.TM : {
                x = xm;
                y = yt;
                break;
            }
            case HitTestResult.TR : {
                x = xr;
                y = yt;
                break;
            }
            case HitTestResult.ML : {
                x = xl;
                y = ym;
                break;
            }
            case HitTestResult.MR : {
                x = xr;
                y = ym;
                break;
            }
            case HitTestResult.BL : {
                x = xl;
                y = yb;
                break;
            }
            case HitTestResult.BM : {
                x = xm;
                y = yb;
                break;
            }
            case HitTestResult.BR : {
                x = xr;
                y = yb;
                break;
            }
            default: {
                return null;
            }
        }
        
        return Point.point.init(x, y);
    }

    /**
     * 判断指定点所在的区域。
     */ 
    public hitTest(x:number, y:number) : HitTestResult {
        var ret:HitTestResult = HitTestResult.NONE;
        var arr = RectShape.supportedHitTestResult;

        var n = arr.length;
        for(var i = 0; i < n; i++) {
            var p = this.getPointByHitResult(arr[i]);
            if(p && this.isNearBy(p.x, p.y, x, y)) {
                return arr[i];
            }
        }

        if(ret === HitTestResult.NONE) {
            if(Rect.rect.init(this.x, this.y, this.w, this.h).containsPoint(x, y)) {
                ret = HitTestResult.MM;
            }
        }
        
        return ret;
	}

    /**
     * 保存当前的位置和大小。
     */
    public saveXYWH() : RectShape {
        this.xSave = this.x;
        this.ySave = this.y;
        this.wSave = this.w;
        this.hSave = this.h;
        
        return this;
    }

    /**
     * 增量的修改位置和大小。
     */
    public moveResizeDelta(hitTestResult:HitTestResult, dx:number, dy:number) : RectShape {
        var x = this.xSave;
        var y = this.ySave;
        var w = this.wSave;
        var h = this.hSave;

        switch(hitTestResult) {
            case HitTestResult.TL: {
                x += dx;
                y += dy;
                w -= dx;
                h -= dy;
                break;
            }
            case HitTestResult.TM : {
                y += dy;
                h -= dy;
                break;
            }
            case HitTestResult.TR : {
                y += dy;
                h -= dy;
                w += dx;
                break;
            }
            case HitTestResult.ML: {
                x += dx;
                w -= dx;
                break;
            }
            case HitTestResult.MM : {
                x += dx;
                y += dy;
                break;
            }
            case HitTestResult.MR : {
                w += dx;
                break;
            }
            case HitTestResult.BL: {
                x += dx;
                w -= dx;
                h += dy;
                break;
            }
            case HitTestResult.BM : {
                h += dy;
                break;
            }
            case HitTestResult.BR : {
                h += dy;
                w += dx;
                break;
            }
        } 

        this.x = Math.max(0, x);
        this.y = Math.max(0, y);
        this.w = Math.max(RectShape.MIN_SIZE, w);
        this.h = Math.max(RectShape.MIN_SIZE, h);

        return this; 
    }

	public onPointerDown(evt:Events.PointerEvent) {
        this.hitTestResult = this.hitTest(evt.localX, evt.localY);
        this.saveXYWH();
    }
    
	public onPointerMove(evt:Events.PointerEvent) {
        if(this.hitTestResult === HitTestResult.NONE || !evt.pointerDown) {
            return;
        }

        this.moveResizeDelta(this.hitTestResult, evt.dx, evt.dy);
    }

	public onPointerUp(evt:Events.PointerEvent) {
        this.hitTestResult = HitTestResult.NONE;
        if(this.x !== this.xSave || this.y !== this.ySave || this.w !== this.wSave || this.h !== this.hSave) {
            this.execCmd(CmdMoveResize.create(this));
        }
    }

    public static MIN_SIZE = 10;
    public static TYPE = "rect";  
    
    public static supportedHitTestResult = [HitTestResult.TL, HitTestResult.TM, HitTestResult.TR,
        HitTestResult.ML, HitTestResult.MM, HitTestResult.MR,
        HitTestResult.BL, HitTestResult.BM, HitTestResult.BR];

    public static create() : RectShape {
        var shape = new RectShape();
        return shape;
    }
}

ShapeFactory.registerCreator(RectShape.TYPE, "basic", RectShape.create);
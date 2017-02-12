import {IShape, Shape, ShapeStyle} from "./shape"
import {ShapeFactory} from "./shape-factory"
import {Point, Events, Emitter, Rect} from "qtk"

export enum ArrowType{
	NONE = 0,
	NORMAL,
	DIAMON,
	TRIANGLE,
	FILLED_DIAMON,
	FILLED_TRIANGLE
}

export class LineShapeStyle extends ShapeStyle{
	public lineStyle : number;
	public firstArrow : ArrowType;
	public secondArrow : ArrowType;
	
	constructor(){
		super();

		this.lineStyle = 0;
		this.firstArrow = ArrowType.NONE;
		this.secondArrow = ArrowType.NONE; 
	}

	public static create(json?:any) : LineShapeStyle {
		var style = new LineShapeStyle();
		if(json) {
			style.fromJson(json);	
		}
		
		return style;
	}
}

export class LineShape extends Shape {
	public isRect = false;
	public isLine = true;
	public style  : LineShapeStyle;
    public points : Array<Point>;

   public constructor(type?:string) {
        super();
        this.type = type || LineShape.TYPE;
        this.style = LineShapeStyle.create(); 
    }

	public isInRect(rect:Rect) : boolean {
        var n = this.points.length;
        if(!n) {
            return false;
        }
        var firstP = this.points[0];
        var lastP = this.points[n-1];

        return rect.containsPoint(firstP.x, firstP.y) && rect.containsPoint(lastP.x, lastP.y);
	}

	public toJson() : any {
        return {
            id : this.id,
            name : this.name,
            type : this.type,
            isRect : true,
            isLine : false,
            style  : this.style.toJson(),
        };
    }

	public fromJson(json:any) : IShape {
        for(var key in json) {
            var value = json[key];
            if(key === 'style') {
                this.style = LineShapeStyle.create(value);
            }else{
                this[key] = value;
            }
        }

        return this;
    }

	public draw(ctx:CanvasRenderingContext2D) {
        var style = this.style;
        ctx.lineWidth = style.lineWidth;
        ctx.strokeStyle = style.lineColor;
        
        ctx.beginPath();
        this.points.forEach((p:Point, index:number) => {
            if(index){
                ctx.lineTo(p.x, p.y);
            }else{
                ctx.moveTo(p.x, p.y);
            }
        });

        ctx.stroke();
    }

	public onPointerDown(evt:Events.PointerEvent) {

    }
    
	public onPointerMove(evt:Events.PointerEvent) {

    }

	public onPointerUp(evt:Events.PointerEvent) {

    }

    public static TYPE = "line";  
    public static create() : LineShape {
        var shape = new LineShape();
        return shape;
    }
}

ShapeFactory.registerCreator(LineShape.TYPE, "basic", LineShape.create);
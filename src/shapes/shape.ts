import {Events, Emitter, Rect} from "qtk"
import {ICmdEdit} from "../editor-cmds/cmd-edit"

/**
 * Shape的外观效果参数。
 */
export class ShapeStyle {
	/**
	 * 线条宽度。
	 */
	public lineWidth   : number;

	/**
	 * 线条颜色，兼容CSS的颜色参数，如"rgba(123,123,123,0.5)", "#ffffff", "gold"。
	 */
	public lineColor   : string;

	/**
	 * 文字的颜色，兼容CSS的颜色参数。
	 */
	public textColor   : string;

	/**
	 * 字体的大小。单位为像素(px)。
	 */
	public fontSize    : number;

	/**
	 * 字体簇。
	 */
	public fontFamily  : string;

	/**
	 * 文字使用粗体。
	 */
	public bold : boolean;

	/**
	 * 文字使用斜体。
	 */
	public italic : boolean;

	/**
	 * 文字使用下划线。
	 */
	public underline : boolean;

	/**
	 * 字体。由其它参数组合而成，目前不支持设置。
	 */
	public get font() : string {
		var font = "";
		if(this.bold) {
			font += "Bold ";
		}
		if(this.italic) {
			font += "Italic "
		}

		font += this.fontSize + 'px ' + this.fontFamily; 
		
		return font;
	}	

	public set font(value:string) {
	}
	
	public constructor() {
		this.lineWidth = 1;
		this.lineColor = 'black';
		this.textColor = 'black';
		this.fontSize = 14;
		this.fontFamily = "Sans";
		this.bold = false;
		this.italic = false;
		this.underline = false;
	}

	/**
	 * 把当前对象的属性存到一个JSON对象中。
	 */
	public toJson() : any {
		var json:any = {};
		for(var key in this) {
			var value = this[key];
			var type = typeof this[key];
			if(type !== 'function') {
				json[key] = value;
			}
		}

		return json;
	}

	/**
	 * 从JSON对象初始化当前的对象的属性。
	 */
	public fromJson(json:any) : ShapeStyle {
		for(var key in json) {
			this[key] = json[key];
		}

		return this;
	}
};

/**
 * 点击测试的结果。
 */
export enum HitTestResult {
	/**
	 * 没有点击到Shape。
	 */
	NONE = 0,
	/**
	 * 点击到左上角。
	 */
	TL,
	/**
	 * 点击到上方中间点。
	 */
	TM,
	/**
	 * 点击到右上角。
	 */
	TR,
	/**
	 * 点击到左方中间点。
	 */
	ML,
	/**
	 * 点击到右方中间点。
	 */
	MR,
	/**
	 * 点击到Shape上，但不在任何特殊点上。
	 */
	MM,
	/**
	 * 点击到左下角。
	 */
	BL,
	/**
	 * 点击到下方中间点。
	 */
	BM,
	/**
	 * 点击到右下角。
	 */
	BR,
	/**
	 * 点击到点1。
	 */
	P1,
	/**
	 * 点击到点2。
	 */
	P2,
	/**
	 * 点击到点3。
	 */
	P3,
	/**
	 * 点击到点4。
	 */
	P4,
	/**
	 * 点击到点5。
	 */
	P5,
	/**
	 * 点击到点6。
	 */
	P6
}

/**
 * Shape接口，任何Shape都需实现IShape接口。
 * Shape代表任意的图形，通常有两类：一类是面，如矩形，圆形和菱形等。另外一类是线条，可以是直线，曲线和多条线的组合。
 */
export interface IShape {
	/**
	 * ID是Shape唯一标识，在Shape创建时自动生成，一般情况不要修改它。
	 */
	id : string;
	/**
	 * Shape的名称。
	 */
	name : string;

	/**
	 * Shape的类型，是该Shape实现类的名称，可以用ShapeFactory创建Shape对象。
	 */
	type : string;

	/**
	 * 标识当前shape是否被选中，以及被选中的时间。在编辑器中拷贝/剪切/删除/对齐等操作都会用到它。
	 */
	selected : number;

	/**
	 * 标识当前shape是否是矩形类Shape，目前矩形、菱形和圆形都归于矩形类Shape，它们都由四个点来决定大小和位置。
	 * 只有矩形类Shape才具有对齐等行为。
	 */
	isRect : boolean;

	/**
	 * 标识当前shape是否是线条类Shape。
	 */
	isLine : boolean;

	/**
	 * Shape的外观效果参数。
	 */
	style  : ShapeStyle;

	/**
	 * Shape上显示的文本。
	 */
	text : string;

	/**
	 * 当前指针设备(如鼠标)点击的位置。
	 */
	hitTestResult : HitTestResult;

	/**
	 * 指向父Shape的引用。
	 */
	parent : IShape;

	/**
	 * 判断Shape是否在指定的Rect内。
	 */
	isInRect(rect:Rect) : boolean;

	/**
	 * 点击测试。判读指定点在当前Shape上的位置。
	 */
	hitTest(x:number, y:number) : HitTestResult;

	/**
	 * 把当前对象的属性存到一个JSON对象中。
	 */
	toJson() : any;

	/**
	 * 从JSON对象初始化当前的对象的属性。
	 */
	fromJson(json:any) : IShape;

	/**
	 * 执行一个编辑命令，并返回执行结果。
	 * 为了让所有的编辑操作都可以撤销和重做，编辑操作都由本函数统一执行，方便记录执行历史。
	 */
    execCmd(cmd:ICmdEdit) : boolean;

	/**
	 * 通知关注者Shape的属性有变化，这样关注者可以执行相应的动作，如View重绘等。
	 */
	notifyChange();
	
	/**
	 * 注册Shape的变化事件，Shape的属性有变化时会执行注册的回调函数func。
	 */
	onChange(func:Function);

	/**
	 * 注销Shape的变化事件。
	 */
	offChange(func:Function);
	
	/**
	 * 绘制当前Shape。
	 */
	draw(ctx:CanvasRenderingContext2D);

	/**
	 * 处理指针按下事件。
	 */
	onPointerDown(evt:Events.PointerEvent);
	
	/**
	 * 处理指针移动事件。
	 */
	onPointerMove(evt:Events.PointerEvent);
	
	/**
	 * 处理指针抬起事件。
	 */
	onPointerUp(evt:Events.PointerEvent);
}

export class Shape extends Emitter implements IShape {
	public id   : string;
	public name : string;
	public text : string;
	public type : string;
	public selected = 0;
	public isRect = false;
	public isLine = false;
	public style  : ShapeStyle;
	public hitTestResult : HitTestResult;
	public parent : IShape;

	/**
	 * 选择点的大小。
	 */
	public static POINT_SIZE = 5;

	private changeEvent : Events.ChangeEvent;

	/**
	 * 判断点(x2, y2)是否在点(x1, y1)附近。
	 */
	public isNearBy(x1:number, y1:number, x2:number, y2:number) : boolean {
		return (x1-Shape.POINT_SIZE) <= x2 
			&& (x1+Shape.POINT_SIZE) >= x2
			&& (y1-Shape.POINT_SIZE) <= y2
			&& (y1+Shape.POINT_SIZE) >=  y2;
	}

	public isInRect(rect:Rect) : boolean {
		return false;
	}

	public hitTest(x:number, y:number) : HitTestResult {
		return HitTestResult.NONE;
	}

    public notifyChange() {
        this.dispatchEvent(this.changeEvent);
    }

    public onChange(func:Function) {
        this.on(Events.CHANGE, func);
    }

    public offChange(func:Function) {
        this.off(Events.CHANGE, func);
	}

    public constructor(type?:string) {
		super();
		this.type = type;
		this.id = Date.now() + "-" + Math.floor(Math.random() * 10000);
		this.changeEvent = Events.ChangeEvent.create();
		this.changeEvent.init(Events.CHANGE, {}); 
    }

	public toJson() : any {
        return null;
    }

	public fromJson(json:any) : IShape {
        return this;
    }

	public draw(ctx:CanvasRenderingContext2D) {
    }

	public onPointerDown(evt:Events.PointerEvent) {
		
    }
    
	public onPointerMove(evt:Events.PointerEvent) {
    }

	public onPointerUp(evt:Events.PointerEvent) {
	}
	
	public execCmd(cmd:ICmdEdit) : boolean{
		//所有命令由根Shape统一执行。
		if(this.parent) {
			return this.parent.execCmd(cmd);
		}
	}
}

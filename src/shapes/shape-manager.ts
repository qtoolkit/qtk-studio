import {Emitter, Rect, Events}  from "qtk";

import {RectShape, RectShapeStyle} from "./rect-shape";
import {IShape, ShapeStyle} from "./shape";
import {ShapeFactory} from "./shape-factory";
import {GroupShape} from "./group-shape"

import {CmdAddShape} from "../editor-cmds/cmd-add-shape";
import {CmdComposite} from "../editor-cmds/cmd-composite";
import {CmdMoveResize} from "../editor-cmds/cmd-move-resize"
import {CmdRemoveShape} from "../editor-cmds/cmd-remove-shape"

/**
 * Shape管理器，在GroupShape提供了一些编辑功能。
 */
export class ShapeManager extends GroupShape {
	/**
	 * 剪切板，保存拷贝的shapes的JSON数据。
	 */
    public clipBoard : any;

    constructor() {
        super();
    }

	/**
	 * 剪切选中的shapes。
	 */
    public cut() {
        this.copy();
        this.del();
    }

	/**
	 * 拷贝选中的shapes。
	 */
    public copy() {
        var selectedShapes = this.getSelectedShapes(false);
        this.clipBoard = selectedShapes.map((iter:IShape) => iter.toJson());
    }

	/**
	 * 删除选中的shapes。
	 */
    public del() {
        this.removeSelectedShapes();
    }

	/**
	 * 删除选中的shapes。
	 */
    public removeSelectedShapes() : GroupShape {
		var cmd = CmdComposite.create();
        var selectedIShapes = this.shapes.filter((iter:IShape) => iter.selected);
        selectedIShapes.forEach((iter:IShape) => {
			cmd.add(CmdRemoveShape.create(this, iter));
        });
        this.execCmd(cmd);

        return this;
    }

	/**
	 * 粘贴。用剪切板中的JSON创建shapes，并加入到当前shape中。
	 */	
    public paste() {
        var json = this.clipBoard;
        if(json) {
			var cmd = CmdComposite.create();
            json.forEach((iter:any) => {
				delete iter.id; //删除id，否则与之前的id重复。

                var shape = ShapeFactory.createWithJson(iter);
				cmd.add(CmdAddShape.create(this, shape));
            });
			this.execCmd(cmd);
        }
    }

	/**
	 * 检查是否可以粘贴。
	 */
    public canPaste() {
        return this.clipBoard && this.clipBoard.length > 0;
    }

	/**
	 * 用指定的方式对齐当前被选中的Rect Shapes。
	 */
	public align(doAlign:Function) {
		var selectedShapes = this.getSelectedRectShapes(true);
		var first = selectedShapes[0];
		var last = selectedShapes[selectedShapes.length-1];

		var cmd = CmdComposite.create();
		selectedShapes.forEach((iter:RectShape) => {
			iter.saveXYWH();
			doAlign(iter, first, last);
			cmd.add(CmdMoveResize.create(iter));
		});
		this.execCmd(cmd);

		return true;
	}
	
	/**
	 * 让当前被选中的Rect Shapes在垂直方向上均匀分布。
	 */	
	public alignDistV() {
		var cmd = CmdComposite.create();
		var selectedShapes = this.getSelectedRectShapes(true);
		if(selectedShapes.length < 3) return true;
		
		selectedShapes.sort((a:RectShape, b:RectShape) => a.y - b.y);

		var first = selectedShapes[0];
		var last = selectedShapes[selectedShapes.length-1];

		var y = first.y;
		var h = selectedShapes.reduce((result:number, iter:RectShape) =>{
			result += iter.h;
			return result;
		}, 0);
		var gap = (last.y + last.h - first.y - h)/(selectedShapes.length-1); 
		
		selectedShapes.forEach((iter:RectShape) => {
			iter.saveXYWH();
			iter.y = y;
			y += iter.h + gap;
			cmd.add(CmdMoveResize.create(iter));
		});

        this.execCmd(cmd);
		
		return true;
	}
	
	/**
	 * 让当前被选中的Rect Shapes在水平方向上均匀分布。
	 */	
	public alignDistH() {
		var cmd = CmdComposite.create();
		var selectedShapes = this.getSelectedRectShapes(true);
		if(selectedShapes.length < 3) return true;
		
		selectedShapes.sort((a:RectShape, b:RectShape) => a.x - b.x);
		
		var first = selectedShapes[0];
		var last = selectedShapes[selectedShapes.length-1];

		var x = first.x;
		var w = selectedShapes.reduce((result:number, iter:RectShape) =>{
			result += iter.w;
			return result;
		}, 0);
		var gap = (last.x + last.w - first.x - w)/(selectedShapes.length-1); 
		
		selectedShapes.forEach((iter:RectShape) => {
			iter.saveXYWH();
			iter.x = x;
			x += iter.w + gap;
			cmd.add(CmdMoveResize.create(iter));
		});

        this.execCmd(cmd);
		
		return true;
	}

	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的左边为基准对齐。
	 */	
	public alignLeft() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.x = first.x;
		});
	}

	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的水平中心为基准对齐。
	 */	
	public alignCenter() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.x = first.x+(first.w>>1) - (iter.w >> 1);
		});
	}

	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的顶部为基准对齐。
	 */	
	public alignTop() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.y = first.y;
		});
	}
	
	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的垂直中心为基准对齐。
	 */	
	public alignMiddle() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.y = first.y+(first.h>>1) - (iter.h>>1);
		});
	}
	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的右边为基准对齐。
	 */	
	public alignRight() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.x = first.x+first.w-iter.w;
		});
	}

	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape的底部为基准对齐。
	 */	
	public alignBottom() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.y = first.y+first.h-iter.h;
		});
	}
	
	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的宽度。
	 */	
	public alignToSameWidth() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.w = first.w;
		});
	}
	
	/**
	 * 让当前被选中的Rect Shapes以第一个被选中的shape为基准设置为相同的高度。
	 */	
	public alignToSameHeight() {
		return this.align((iter:RectShape, first:RectShape) => {
			iter.h = first.h;
		});
	} 
    
	public doDraw(ctx:CanvasRenderingContext2D) {
        this.shapes.forEach((iter:IShape) => iter.draw(ctx));
	}

	public draw(ctx:CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
		this.doDraw(ctx);
        ctx.restore();
    }

	public onPointerDown(evt:Events.PointerEvent) {
        super.onPointerDown(evt);
    }

	public onPointerMove(evt:Events.PointerEvent) {
        super.onPointerMove(evt);
    }

	public onPointerUp(evt:Events.PointerEvent) {
        super.onPointerUp(evt);
    }

    public static create() : ShapeManager {
        var shape = new ShapeManager();
        return shape;
	}	 
}

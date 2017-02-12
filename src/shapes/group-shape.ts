import {Events, Emitter, Rect} from "qtk"

import {RectShape} from "./rect-shape"
import {ShapeFactory} from "./shape-factory"
import {IShape, HitTestResult, ShapeStyle} from "./shape"

/**
 * GroupShape可以容纳其它Shape，通过addShape/removeShape等函数管理其中的Shapes。
 */
export class GroupShape extends RectShape {
    /**
     * 其容纳的子Shapes。
     */
    public shapes : Array<IShape>;

    /**
     * 当前的接受指针事件和按键事件的Shape。 
     */
    public target : IShape;

    private selectedRectShapes : Array<RectShape>;

    constructor(type?:string) {
        super(type);
        this.shapes = [];
    }

    /**
     * 通过名称查找其容纳的子Shapes。
     */
    public findChildByName(name:string) : IShape {
        return this.shapes.find((iter:IShape) => iter.name === name);
    }
    
    /**
     * 通过ID查找其容纳的子Shapes。
     */
    public findChildByID(id:string) : IShape {
        return this.shapes.find((iter:IShape) => iter.id === id);
    }

    /**
     * 增加一个shape
     */
    public addShape(shape:IShape) : GroupShape {
        this.shapes.push(shape);
        shape.parent = this;

        return this;
    }

    /**
     * 删除全部Shapes。
     */
    public removeAllShapes() : GroupShape {
        this.shapes.forEach((shape:IShape) => shape.parent = null);
        this.shapes.length = 0;

        return this;
    }

    /**
     * 删除指定的Shape。
     */
    public removeShape(shape:IShape) : GroupShape {
        var index = this.shapes.indexOf(shape);
        if(index >= 0) {
            this.shapes.splice(index, 1);
        }
        shape.parent = null;

        return this;
    }

    /**
     * 统计被选中的Shapes的个数。
     */
    public countSelectedShapes() : number {
        var nr = 0;
        this.shapes.forEach((iter:IShape) => {
            if(iter.selected) {
                nr++;
            }
        });

        return nr;
    } 

   /**
    * 将全部shapes设置为非选中状态。
    */
   public selectNone() : GroupShape {
        this.shapes.forEach((iter:any) => {
            iter.selected = 0;
        });

        return this;
    }

    /**
     * 将全部shapes设置为选中状态。
     */   
    public selectAll() : GroupShape {
        this.shapes.forEach((iter:any) => {
            iter.selected = Date.now();
        });

        return this;
    }
    
    /**
     * 选中指定区域的Shapes
     */
    public selectShapesInRect(rect:Rect) : GroupShape {
        this.shapes.forEach((iter:IShape) => {
            if(iter.isInRect(rect)) {
                iter.selected = Date.now();
            }else{
                iter.selected = 0;
            }
        });

        return this;
    }

    /**
     * 选中/反选指定Shape。
     */
    public selectShape(target:any, exclude:boolean) : GroupShape {
        if(!target) {
            this.selectNone();
            return this;
        }
        
        if(!exclude) {
        	if(target.selected) {
        		target.selected = 0;
			}else{
        		target.selected = Date.now();
			}
        }else{
            this.shapes.forEach((iter:any) => {
                if(iter === target) {
                    iter.selected = Date.now();
                }else{
                    iter.selected = 0;
                }
            });
        }
        
        return this;
    }

    /**
     * 获取当前被选中的Shapes。
     */
	public getSelectedShapes(sort:boolean) : Array<IShape> {
        var selectedShapes = this.shapes.filter((iter:IShape) => iter.selected);
        if(sort) {
			selectedShapes.sort((a:any, b:any) => a.selected - b.selected);
		}
		
		return selectedShapes;
	}

    /**
     * 获取当前被选中的Rect Shapes。
     */	
    public getSelectedRectShapes(sort:boolean) : Array<RectShape> {
        var selectedShapes = this.getSelectedShapes(sort).filter((iter:IShape) => iter.isRect);

        return <Array<RectShape>>selectedShapes;
    }

    public toJson() : any {
        return this.shapes.map((iter:IShape) => iter.toJson());
    }
    
    public fromJson(arr:Array<any>) : GroupShape {
        this.shapes = arr.map((iter:any) => ShapeFactory.createWithJson(iter));
        this.notifyChange();

        return this;
    }

    /**
     * 查找指定位置处的Shape，如果有多个取最上层的一个。
     */
    public findShapeByPoint(x:number, y:number) : IShape {
        var arr = this.shapes;
        var n = arr.length;

        for(var i = n-1; i >=0; i--) {
            var iter = arr[i];
            if(iter.hitTest(x, y) !== HitTestResult.NONE) {
                return iter;
            }
        }
        
        return null;
    }

    /**
     * 转换指针事件的localX/localY为相对于当前shape的。
     */
    public translatePointEvent(evt:Events.PointerEvent) : GroupShape {
        evt.localX -= this.x;
        evt.localY -= this.y;
        
        return this;
    }

    /**
     * 恢复指针事件的localX/localY。
     */
    public untranslatePointEvent(evt:Events.PointerEvent)  : GroupShape {
        evt.localX += this.x;
        evt.localY += this.y;
        
        return this;
    }

	public onPointerDown(evt:Events.PointerEvent) {
		this.translatePointEvent(evt);
        this.target = this.findShapeByPoint(evt.localX, evt.localY);
        if(this.target) {
            this.selectedRectShapes = this.getSelectedRectShapes(false);
            if(this.countSelectedShapes() === 1) {
                this.target.onPointerDown(evt);
            }else if(this.selectedRectShapes){
                this.selectedRectShapes.forEach((iter:RectShape) => iter.saveXYWH());
            }
        }
        this.untranslatePointEvent(evt);
    }
    
	public onPointerMove(evt:Events.PointerEvent) {
        if(this.target) {
            var dx = evt.dx;
            var dy = evt.dy;

            if(this.countSelectedShapes() === 1) {
                this.translatePointEvent(evt);
                this.target.onPointerMove(evt);
                this.untranslatePointEvent(evt);
            }else if(this.selectedRectShapes && this.selectedRectShapes.length > 0) {
                this.selectedRectShapes.forEach((iter:RectShape) => {
                    iter.moveResize(iter.xSave+dx, iter.ySave+dy, iter.w, iter.h);
                });
            }
        }
    }

	public onPointerUp(evt:Events.PointerEvent) {
        if(this.target) {
            if(this.countSelectedShapes() === 1) {
		        this.translatePointEvent(evt);
                this.target.onPointerUp(evt);
                this.untranslatePointEvent(evt);
            }else if(this.selectedRectShapes){
                this.selectedRectShapes = null;
            }
        }
    }  

    public onClick(evt:Events.PointerEvent) {
        if(Math.abs(evt.dx) > 0 && Math.abs(evt.dy) > 0) {
            return;
        }
        
        this.translatePointEvent(evt);
        if(this.target) {
            this.selectShape(this.target, !evt.ctrlKey);
        }else{
            this.selectShape(null, false);
        }
        this.untranslatePointEvent(evt);
    } 

    public static create() : GroupShape {
        var shape = new GroupShape();
        return shape;
    }
}

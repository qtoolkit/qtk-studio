import {Point, Events, Widget, Resizable, BehaviorFactory} from "qtk";

export class Editable extends Resizable {
    public static TYPE = "editable";
	protected static MOVE = "move";

	protected testPointerPosition(evt:Events.PointerEvent){
		var result = super.testPointerPosition(evt);
		if(!result) {
			var border = this.border;
			var widget = this.widget;
			var p = widget.toLocalPoint(Point.point.init(evt.x, evt.y));
			if(p.x > border && p.y > border && p.x < widget.w && p.y < widget.h) {
				result = Editable.MOVE;
			}
		}

		return result;
	}

	protected onPointerMove(evt:Events.PointerEvent){
		if(this.pointerDownArea === Editable.MOVE) {
			this.widget.moveTo(this.x+evt.dx, this.y+evt.dy);
			return;
		}
		
		super.onPointerMove(evt);
	}

	protected afterWidgetDraw(evt:Events.DrawEvent) {
        var ctx = evt.ctx;
        var widget:Widget = evt.widget;
		
		if(widget.selected) {
			ctx.beginPath();
			ctx.rect(0, 0, widget.w, widget.h);
			ctx.strokeStyle = "gold";
			ctx.stroke();
		}
	}

	constructor(widget:Widget, options:any) {
		super(widget, options, Editable.TYPE);
		this.afterDrawFunc = this.afterWidgetDraw.bind(this);
		widget.on(Events.AFTER_DRAW, this.afterDrawFunc); 
	}

	protected dispose() {
		this.widget.off(Events.AFTER_DRAW, this.afterDrawFunc);
		super.dispose();
	}

	private afterDrawFunc : Function;
}

BehaviorFactory.register(Editable.TYPE, function(widget:Widget, options:any) {
	return new Editable(widget, options);
});
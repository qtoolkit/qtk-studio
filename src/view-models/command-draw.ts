
import {ICommand} from "qtk";
import {DrawInfo} from "../models/draw-info"

export class CommandDraw implements ICommand {
	protected _canvas : any;

	constructor(canvas:any) {
		this._canvas = canvas;

		return this;
	}

	public canExecute() : boolean {
		return true;
	}

	public execute(args:any) : boolean {
		var drawInfo = <DrawInfo>args;

		var ctx = drawInfo.ctx;
		var rect = drawInfo.rect;
		var canvas = this._canvas;
		
		if(canvas) {
			var w = rect.w >> 0;
			var h = rect.h >> 0;
			if(canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
			}

			ctx.drawImage(canvas, 0, 0);
		}

		return true;
	}

	public static create(canvas:any) : ICommand {
		return new CommandDraw(canvas);
	}
};

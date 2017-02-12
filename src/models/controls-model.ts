import {Button, Label, Edit, ComboBox} from "qtk";


export class ControlsModel extends Array<any> {
	public constructor() {
		super();

		this.push({text:"Button", 
			info : {
				type:"widget", 
				w : 200,
				h : 30,
				widgetInfo:{type:Button.TYPE, _text:"Button"}
			}
		});	
		
		this.push({text:"Label", 
			info : {
				type:"widget", 
				w : 200,
				h : 30,
				widgetInfo:{type:Label.TYPE, _text:"Label"}
			}
		});	
		
		this.push({text:"Edit", 
			info : {
				type:"widget", 
				w : 200,
				h : 30,
				widgetInfo:{type:Edit.TYPE, _text:"Edit"}
			}
		});	
		
		this.push({text:"ComboBox", 
			info : {
				type:"widget", 
				w : 200,
				h : 30,
				widgetInfo:{type:ComboBox.TYPE, _text:"ComboBox"}
			}
		});	
	}

	public static create() : ControlsModel {
		return new ControlsModel();
	}
};

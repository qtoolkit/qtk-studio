import {IShape} from "./shape"

export class ShapeFactory {	
	public static categories = {};
	public static creators = {};

	public static unregisterCreator(type:string, category:string) : boolean {
		var creators = ShapeFactory.categories[category];
		if(creators) {
			delete creators[type];
			delete ShapeFactory.creators[type];

			return true;
		}

		return false;
	}

	public static registerCreator(type:string, category:string, creator:Function) : boolean {
		var creators = ShapeFactory.categories[category];
		if(!creators) {
			ShapeFactory.categories[category] = {};
			creators = ShapeFactory.categories[category];
		}

		creators[type] = creator;
		ShapeFactory.creators[type] = creator;

		return true;
	}
	
	public static createWithJson(json:any) : IShape {
		var type = json.type;
		var create = ShapeFactory.creators[type];
		if(create) {
			var shape = create();

			return shape.fromJson(json);
		}

		return null;
	}
}

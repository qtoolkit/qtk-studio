import {MainModel} from "../models/main-model";
import {ICommand, PagePropsDesc, PropsInfo, InteractionRequest} from "qtk";

export class CommandProjectSettings implements ICommand {
    protected model : MainModel;
    public canExecute(): boolean {
        return true;
    }

    public execute(args: any): boolean {
		var json = [
			{type:"number", titleW:108, name:"Design Width", desc:"Design Width", path:"designWidth"},
			{type:"number", titleW:108, name:"Design Height", desc:"Design Height", path:"designHeight"}
		];
        
        var data = {designWidth:this.model.w, designHeight:this.model.h};
		var propsDesc = PagePropsDesc.create("Project Settings", json);
		InteractionRequest.props(PropsInfo.create(propsDesc, data, true, 320), (ret) => {
            this.model.w = ret.data.designWidth;
            this.model.h = ret.data.designHeight;
		})

        return true;
    }

    constructor(model:MainModel) {
        this.model = model;
    }

    public static create(model:MainModel) : ICommand {
        return new CommandProjectSettings(model);
    }
}

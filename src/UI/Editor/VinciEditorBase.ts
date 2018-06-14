import { VinciWidget } from './../VinciWidget';
import { Extend } from '../../Utilities/Extend';
export interface IVinciEditorBaseEvents{
    Change:string
}
export abstract class VinciEditorBase<OptionsT> extends VinciWidget<OptionsT> {
    public Events:IVinciEditorBaseEvents=Extend({Change:"change"},this.Events);
    private CurrentItems:Array<any>
    public GetCurrentItems():any{
        return this.CurrentItems||[];
    }
    protected SetCurrentItems(items:Array<any>){
        this.CurrentItems=items;
    }
    protected GetValue(): any {
        return this.Element.dataset.value;
    }
    protected SetValue(value) {
        this.Element.dataset.value=value;
        this.SetState(this.Events.Change,value,true);
    }
    public Value(value?: any): any {
        if (value === undefined)
            return this.GetValue();
        else
            this.SetValue(value);
    }
}
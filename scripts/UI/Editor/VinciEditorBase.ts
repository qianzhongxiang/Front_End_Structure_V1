import { VinciWidget } from './../VinciWidget';
import { Extend } from '../../Utilities/Extend';
export interface IVinciEditorBaseEvents{
    Change:string
}
export abstract class VinciEditorBase<OptionsT> extends VinciWidget<OptionsT> {
    public Events:IVinciEditorBaseEvents=Extend({Change:"change"},this.Events);
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
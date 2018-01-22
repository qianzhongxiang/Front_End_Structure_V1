import { VinciWidget } from './../VinciWidget';
export declare abstract class VinciEditorBase<OptionsT> extends VinciWidget<OptionsT> {
    protected GetValue(): any;
    protected SetValue(value: any): void;
    Value(value?: any): any;
}

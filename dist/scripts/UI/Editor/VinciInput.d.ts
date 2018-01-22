import { VinciEditorBase } from './VinciEditorBase';
export declare class VinciInput<OptionsT extends any> extends VinciEditorBase<OptionsT> {
    private InputChangeEvent;
    constructor(element?: HTMLInputElement, options?: any);
    protected SetValue(value: any): void;
    protected ValueChanged(e: Event): void;
    Destroy(): void;
}

import { VinciLayerBase } from './VinciLayerBase';
export interface Options {
    /**0<=opacity<=1*/
    opacity: number;
}
export declare class VinciModalLayer<OptionsT extends Options> extends VinciLayerBase<OptionsT> {
    constructor(element?: HTMLDivElement, options?: OptionsT);
}

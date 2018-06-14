import { VinciLayerBase } from './VinciLayerBase';
export interface IVinciModalLayerOptions {
    /**0<=opacity<=1*/
    opacity: number
}
export class VinciModalLayer<OptionsT extends IVinciModalLayerOptions> extends VinciLayerBase<OptionsT> {
    constructor(element?: HTMLDivElement, options?: OptionsT) {
        let ele = element || document.createElement("div");
        ele.classList.add("modal-backdrop", 'fade', 'in');
        if (options && options.opacity) ele.style.opacity = options.opacity.toString();
        super(ele, options);
    }
}
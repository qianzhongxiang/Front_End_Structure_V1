import { VinciLayerBase } from './VinciLayerBase';
export class VinciModalLayer<OptionsT extends any> extends VinciLayerBase<OptionsT> {
    constructor(element?: HTMLDivElement, options?) {
        let ele = element || document.createElement("div");
        ele.classList.add("modal-backdrop");
        ele.classList.add("fade");
        ele.classList.add("in");
        super(ele, options);
    }
}
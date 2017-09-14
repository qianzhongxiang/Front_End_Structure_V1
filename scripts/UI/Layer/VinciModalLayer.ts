import {VinciLayerBase} from './VinciLayerBase';

export class VinciModalLayer extends VinciLayerBase<any> {
    constructor(element?: HTMLDivElement, options?) {
        let ele = element || document.createElement("div");
        ele.classList.add("modal-backdrop");
        ele.classList.add("fade");
        ele.classList.add("in");
        super(ele, options);
    }
}
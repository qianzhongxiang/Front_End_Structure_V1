import { Widget } from './../Widget';

export class ModalLayer extends Widget {
    constructor(element?: HTMLDivElement, options?) {
        let ele = element || document.createElement("div");
        ele.classList.add("modal");
        ele.classList.add("fade");
        super(ele, options);
    }
}
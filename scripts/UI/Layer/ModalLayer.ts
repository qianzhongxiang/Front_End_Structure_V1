/// <reference path="../Widget.ts"/>
namespace UI.Layer{
    export class ModalLayer extends Widget {
        constructor(element?:HTMLDivElement,options?){
            let ele=element||document.createElement("div");
            ele.classList.add("modal");
            ele.classList.add("fade");
            super(ele,options);
        }
    }
}
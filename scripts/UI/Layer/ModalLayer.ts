/// <reference path="../Widget.ts"/>
namespace UI.Layer{
    export class ModalLayer extends Widget {
        constructor(element?:HTMLElement,options?){
            let ele=element||document.createElement("div");
            ele.style.height="100%";
            super(ele,options);
        }
    }
}
/// <reference path="../Widget.ts" />

namespace UI.Layer{
    export abstract class LayerBase extends Widget {
        public Open()
        {
            this.Wrapper.style.display="block";
        }
        public Close(){
            this.Wrapper.style.display="none";
        }
    }
}
import { Widget } from "../Widget";

export abstract class LayerBase extends Widget {
    public Open() {
        this.Wrapper.style.display = "block";
    }
    public Close() {
        this.Wrapper.style.display = "none";
    }
}
import { Widget } from "../Widget";
import { ModalLayer } from "./ModalLayer";

export interface IWindowOptions {
    AutoDestory?: boolean
}
export class Window extends Widget {
    public MODELLAYER: string;
    protected DefaultOptions: IWindowOptions = { AutoDestory: true }
    constructor(element: HTMLElement, options: IWindowOptions) {
        super(element, options)
        this.Initialization();
    }
    /**
     * need to satisfiy rebuiding of widget.
     */
    protected Initialization() {
        if (this.MODELLAYER) {
            let c = this.Remove(this.GetChild(this.MODELLAYER));
            if (c) c.Destroy();
        }
        this.MODELLAYER = this.Add(new ModalLayer()).Id;
    }

}
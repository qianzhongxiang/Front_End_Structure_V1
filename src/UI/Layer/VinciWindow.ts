import { VinciLayerBase } from './VinciLayerBase';
import { VinciModalLayer } from "./VinciModalLayer";

export interface IVinciWindowOptions {
    AutoDestory?: boolean
    Title?: string
    Width?: string
    Height?: string
    Size?: 'lg' | 'sm' | 'unlimited'
    // Align?:string
}
export class VinciWindow extends VinciLayerBase<IVinciWindowOptions> {
    public MODELLAYER: string;
    protected get DefaultOptions(): IVinciWindowOptions {
        return { AutoDestory: true, Title: "My modal Window" }; //,Align:"center"
    }
    constructor(element: HTMLDivElement, options?: IVinciWindowOptions) {
        super(element, options)
    }
    /**
     * need to satisfiy rebuiding of widget.
     */
    protected Initialization() {
        if (this.MODELLAYER) {
            let c = this.Remove(this.GetChild(this.MODELLAYER));
            if (c) c.Destroy();
        }
        this.MODELLAYER = this.Add(new VinciModalLayer(undefined, { opacity: 0.4 })).Id;

        if (this.Wrapper.parentNode)
            this.Wrapper.parentNode.removeChild(this.Wrapper)
        this.Wrapper = document.createElement("div");
        this.Wrapper.style.color = "black";
        let dialog = document.createElement("div");
        dialog.classList.add("modal-dialog")
        switch (this.Options.Size) {
            case "lg":
                dialog.classList.add("modal-lg");
                break;
            case "sm":
                dialog.classList.add("modal-sm");
                break;
            case "unlimited":
                dialog.style.maxWidth = "none";
                break;
        }
        dialog.style.width = this.Options.Width
        dialog.style.height = this.Options.Height
        let content = document.createElement("div");
        content.style.height = "100%"
        dialog.appendChild(content);
        content.classList.add("modal-content")
        content.appendChild(this.GenerateHeader());
        content.appendChild(this.GenerateContent());
        // content.appendChild(this.GenerateFoot());
        this.Wrapper.appendChild(dialog);
        this.Wrapper.classList.add("center-block"); //default Align:"center"
        this.Wrapper.classList.add("modal"); //animation need fade
        this.Wrapper.classList.add("in"); //animation need fade
    }
    private GenerateHeader(): HTMLDivElement {
        let header = document.createElement("div");
        header.classList.add("modal-header");
        header.style.padding = "8px 1em";
        let h5 = document.createElement("h5");
        h5.classList.add("modal-title")
        h5.innerText = this.Options.Title;
        header.appendChild(h5)
        let button = document.createElement("button");
        button.type = "button";
        button.classList.add("close");
        button.setAttribute("aria-label", "Close");
        button.innerHTML = '<span aria-hidden="true">&times;</span>';
        button.onclick = this.Close.bind(this);
        header.appendChild(button);
        return header;
    }
    private GenerateContent(): HTMLDivElement {
        let content = document.createElement("div");
        content.appendChild(this.Element);
        content.classList.add("modal-body");
        return content;
    }
    private GenerateFoot(): HTMLDivElement {
        let foot = document.createElement("div");
        foot.classList.add("modal-footer");
        return foot;
    }
    public Open() {
        (this.GetChild(this.MODELLAYER) as VinciModalLayer<any>).Open();
        super.Open();
    }
    public Close() {
        super.Close();
        (this.GetChild(this.MODELLAYER) as VinciModalLayer<any>).Close();
        if (this.Options.AutoDestory) this.Destroy();
    }
}
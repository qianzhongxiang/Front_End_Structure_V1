import * as Utilities from './../../Utilities/DataSource';
import { VinciEditorBase } from './VinciEditorBase';

export interface IVinciDropDownListOptions {
    ValueField?: string
    TextField?: string
    DataSource?: Utilities.DataSource | any[]
}
export class VinciDropDownList extends VinciEditorBase<IVinciDropDownListOptions> {
    public DataSource: Utilities.DataSource
    public get DefaultOptions(): IVinciDropDownListOptions {
        return { ValueField: "value", TextField: "text", DataSource: [] }
    }

    constructor(element: HTMLDivElement, options?: IVinciDropDownListOptions) {
        super(element, options);
    }
    protected Initialization() {
        if (!this.Element.classList.contains("dropdown")) this.Element.classList.add("dropdown");
        this.Element.innerHTML='<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
        <span class="caret"></span></button>'
        let ul = this.Element.querySelector("ul");
        if (!ul) { ul = document.createElement("ul"); this.Element.appendChild(ul) }
        if (!ul.classList.contains("dropdown-menu"))
            ul.classList.add("dropdown-menu");
            ul.addEventListener("",this.Selected.bind(this),true)
        if (this.Options.DataSource instanceof Utilities.DataSource)
            this.DataSource = this.Options.DataSource as Utilities.DataSource
        else this.DataSource = new Utilities.DataSource({ Data: this.Options.DataSource as any[] })
        this.DataSource.Success = (e) => { this.GenerateUL(ul,e.Data) }
        this.DataSource.Read();
    }
    protected GenerateUL(ul: HTMLUListElement, data: any[]) {
        ul.innerHTML="";
        (data||[]).forEach(d=>{
            let li=document.createElement("li");
            li.innerHTML='<a href="javascript:void(0);">'+d[this.Options.TextField]+'</a>';
            li.dataset.value=d[this.Options.ValueField];
            li.dataset.source=d;
        })
        this.Options.TextField
    }
    private Selected(e:Event){
       if( e.target instanceof HTMLLIElement){
            let li =e.target as HTMLLIElement;
            
       }
    }
}

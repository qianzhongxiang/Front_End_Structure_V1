import { DataSource } from './../../Utilities/DataSource';
import { Type } from './../../Utilities/Type';
import { VinciEditorBase } from './VinciEditorBase';
import { GetValue } from '../../Utilities/DataSet';

export interface IVinciDropDownOptions {
    ValueField?: string
    TextField?: string
    DataSource?: DataSource
}
export class VinciDropDown<OptionsT> extends VinciEditorBase<IVinciDropDownOptions> {
    public get DefaultOptions(): IVinciDropDownOptions {
        return { ValueField: "value", TextField: "text", DataSource: new DataSource({ Data: [] }) }
    }
    constructor(element: HTMLButtonElement, options?: IVinciDropDownOptions) {
        super(element, options);
    }
    protected Initialization() {
        if (this.Wrapper == this.Element) {
            this.Wrapper = document.createElement("div");
            this.Wrapper.classList.add("dropdown");
            this.Wrapper.addEventListener("click", this.WrapperClick.bind(this));
            (this.Element as HTMLButtonElement).type = "button";
            this.Element.dataset.toggle = "dropdown";
            this.Element.setAttribute("aria-haspopup", "true");
            this.Element.setAttribute("aria-expanded", "false");
            this.Element.parentElement.insertBefore(this.Wrapper, this.Element).appendChild(this.Element);
        }
        this.Options.DataSource.Success = this.DataProcess.bind(this);
        this.Options.DataSource.Read();
    }
    protected DataProcess(e: { Sender: DataSource, Data: Array<any> }) {
        let div = this.Wrapper.querySelector('.dropdown-menu');
        if (!div) {
            div = document.createElement("div");
            div.classList.add('dropdown-menu');
        } else div.innerHTML = "";
        e.Data.forEach(d => {
            let a = document.createElement('a');
            a.href = 'javascript:void(0);'
            a.innerText = GetValue(d, this.Options.TextField).toString();
            a.dataset['item'] = d;
            div.appendChild(a);
        })
        div.addEventListener("click", this.Selected.bind(this))
    }
    private WrapperClick(e: Event) {
        let t = this.Wrapper;
        if (t.classList.contains("open"))
            t.classList.remove("open");
        else t.classList.add("open");
    }
    private Selected(e: Event) {
        if (e.target instanceof HTMLAnchorElement) {
            let a = e.target as HTMLAnchorElement
                , item = a.dataset['item']
            this.Element.innerText = a.innerText;
            this.SetValue(GetValue(item, this.Options.ValueField));
        }
    }
}

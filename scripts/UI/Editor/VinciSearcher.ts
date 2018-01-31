import { VinciWindow } from './../Layer/VinciWindow';
import { VinciTable, IVinciTableCol } from './../Module/VinciTable';
import { DataSource } from './../../Utilities/DataSource';
import { VinciEditorBase } from "./VinciEditorBase";
import { GetValue } from '../../Utilities/DataSet';

export interface IVinciDropDownListOptions {
    ValueField?: string
    TextField?: string
    DataSource?: DataSource
    Columns?: Array<IVinciTableCol>
}

export class VinciSearcher extends VinciEditorBase<IVinciDropDownListOptions>{
    public Events: { Opened: 'opened', Closed: 'closed' }
    private Table: VinciTable
    private Window: VinciWindow
    public get DefaultOptions(): IVinciDropDownListOptions {
        return { ValueField: "value", TextField: "text" ,Columns:[]}
    }
    constructor(element: HTMLInputElement, options?: IVinciDropDownListOptions) {
        super(element, options);
    }
    protected Initialization() {
        if (this.Element == this.Wrapper) {
            this.Element.parentElement.insertBefore(this.Wrapper = document.createElement("div"), this.Element);
            (this.Element as HTMLInputElement).placeholder = "Search for..."
            this.Wrapper.appendChild(this.Element);
            this.Wrapper.classList.add("input-group");
            let rSpan = document.createElement("span"),
                btn = document.createElement("button");
            rSpan.classList.add("input-group-btn")
            btn.classList.add("btn", 'btn-default');
            btn.innerText="GO";
            btn.type = "button";
            btn.addEventListener("click",()=>{
                if(!this.Window||!this.Window.Opened)this.Open()
                else this.Close();
            })
            rSpan.appendChild(btn)
            this.Wrapper.appendChild(rSpan)
        }
    }
    public Open() {
        let tDiv = document.createElement("div");
        this.Table = new VinciTable(tDiv, { Columns: this.Options.Columns, DataSource: this.Options.DataSource });
        this.Table.Bind(this.Table.Events.OnDblclick, (msg) => {
            if (msg.Value) {
                (this.Element as HTMLInputElement).value = GetValue(msg.Value, this.Options.TextField).toString();
                this.SetValue(GetValue(msg.Value, this.Options.ValueField));
            }
        })
        this.Window = new VinciWindow(tDiv);
        this.Add(this.Table);
        this.Add(this.Window);
        this.Window.Open();
        this.SetState(this.Events.Opened)
    }
    public Close() {
        this.Window.Close();
        this.SetState(this.Events.Closed)
        this.Remove(this.Table);
        this.Remove(this.Window);
    }
}
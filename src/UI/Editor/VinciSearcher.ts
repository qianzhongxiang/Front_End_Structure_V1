import { VinciWindow } from './../Layer/VinciWindow';
import { VinciTable, IVinciTableCol } from './../Module/VinciTable';
import { DataSource } from './../../Utilities/DataSource';
import { VinciEditorBase, IVinciEditorBaseEvents } from "./VinciEditorBase";
import { GetValue } from '../../Utilities/DataSet';
import { Extend } from '../../Utilities/Extend';
export interface IVinciSearcherEvents extends IVinciEditorBaseEvents{
    Opened: string
    Closed: string
}
export interface IVinciSearcherOptions {
    ValueField?: string
    TextField?: string
    DataSource?: DataSource
    Columns?: Array<IVinciTableCol>
}
//TODO inheriting vinciinput in the futrue
export class VinciSearcher extends VinciEditorBase<IVinciSearcherOptions>{
    public Events:IVinciSearcherEvents=Extend( { Opened: 'opened', Closed: 'closed' }, this.Events)
    private Table: VinciTable
    private Window: VinciWindow
    public get DefaultOptions(): IVinciSearcherOptions {
        return { ValueField: "value", TextField: "text" ,Columns:[]}
    }
    constructor(element: HTMLInputElement, options?: IVinciSearcherOptions) {
        super(element, options);
    }
    protected Initialization() {
        if (this.Element == this.Wrapper) {
            this.Element.parentElement.insertBefore(this.Wrapper = document.createElement("div"), this.Element);
            let element=this.Element as HTMLInputElement;
            element.placeholder = "Search for...";
            element.type="search";
            element.classList.add("form-control")
            element.addEventListener("change",(e)=>{
                if(!(e.target as HTMLInputElement).value)
                this.SetValue(undefined);
            })
            this.Wrapper.appendChild(this.Element);
            this.Wrapper.classList.add("input-group");
            let appendDiv = document.createElement("div"),
                btn = document.createElement("button");
                appendDiv.classList.add("input-group-append")
            btn.classList.add("btn", 'btn-outline-secondary');//,'fa','fa-search'
            btn.innerHTML="<i class='fa fa-search'></i>&nbsp;"
            // btn.innerText="GO";
            btn.type = "button";
            btn.addEventListener("click",()=>{
                if(!this.Window||!this.Window.Opened)this.Open()
                else this.Close();
            })
            appendDiv.appendChild(btn)
            this.Wrapper.appendChild(appendDiv)
        }
    }
    public Open() {
        let tDiv = document.createElement("div");
        tDiv.style.maxHeight="450px";
        tDiv.style.overflow="auto";
        this.Table = new VinciTable(tDiv, { Columns: this.Options.Columns, DataSource: this.Options.DataSource ,Dbclickable:true});
        this.Table.Bind(this.Table.Events.OnDblclick, (msg) => {
            if (msg.Value) {
                (this.Element as HTMLInputElement).value = GetValue(msg.Value, this.Options.TextField).toString();
                this.SetValue(GetValue(msg.Value, this.Options.ValueField));
            }
            this.Window.Close();
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
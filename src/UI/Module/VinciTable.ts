import { IsMobile } from './../../Utilities/Mobile';
import { DataSource } from './../../Utilities/DataSource';
import { Extend } from './../../Utilities/Extend';
import { VinciWidget } from './../VinciWidget';
import { GetValue } from '../../Utilities/DataSet';
export interface IVinciTableCol {
    field: string | ((item: any) => string)
    width?: number | string
    title?: string
}
export interface IVinciTableOptions {
    DataSource?: DataSource
    Pageable?: boolean
    AutoLoad?: boolean
    Columns?: Array<IVinciTableCol>
    Tooltip?: boolean | ((item: any, field: string) => string)
    /**
     * precentage
     */
    MaxHeight?: number
    /**
    * precentage
    */
    MaxWidth?: number
}
export class VinciTable extends VinciWidget<IVinciTableOptions>{
    public Events = { OnSelect: "OnSelect" } // Extend(super.Events,)
    private Table: HTMLTableElement
    protected get DefaultOptions(): IVinciTableOptions {
        return {
            DataSource: new DataSource({ Data: [] }), Pageable: false, AutoLoad: true, Columns: [], Tooltip: false,
            MaxHeight: 100, MaxWidth: 100
        };
    }
    constructor(element: HTMLDivElement, options?: IVinciTableOptions) {
        super(element, options);
    }
    protected Initialization() {
        this.Options.DataSource.Success = this.DataProcess.bind(this);
        this.Draw();
        if (IsMobile.any())
            this.Table.addEventListener("click", this.Select.bind(this))
        else
            this.Table.addEventListener("dblclick", this.Select.bind(this));

    }
    public SetDataSource(dataSource: DataSource) {
        this.Options.DataSource = dataSource;
        this.Options.DataSource.Success = this.DataProcess.bind(this);
        this.Options.DataSource.Read();
    }
    private Select(e: MouseEvent) {
        let tr = (e.target as HTMLElement).closest('tr') as HTMLTableRowElement;
        if (tr)
            this.SetState(this.Events.OnSelect, tr ? tr['dataItem'] : undefined);
    }
    private Draw() {
        if (this.Table && this.Table.parentElement)
            this.Table.parentElement.removeChild(this.Table);
        let table = this.Table = document.createElement("table"),
            thead = document.createElement("thead"),
            htr = document.createElement('tr')
        thead.appendChild(htr);
        table.classList.add("table", 'table-hover', 'table-sm', `mw-${this.Options.MaxWidth}`, `h-100`);
        table.appendChild(thead);
        this.OrderNo(htr, "#");
        this.Checkbox(htr);
        this.Options.Columns.forEach(col => {
            htr.innerHTML += `<th scope='col'>${col.title || col.field}</th>`
        })
        this.Element.appendChild(table);
        if (this.Options.AutoLoad)
            this.Options.DataSource.Read();
    }
    private OrderNo(tr: HTMLTableRowElement, ordNo: number | string) {
        tr.innerHTML += `<th scope='${typeof ordNo === "string" ? "col" : "row"}'>${ordNo}</th>`
    }
    private Checkbox(tr: HTMLTableRowElement) {
        // htr.innerHTML += `<th scope='col'><input type='checkbox'/></th>`
    }
    private DataProcess(e: { Sender: DataSource, Data: Array<any> }) {
        let orderNo = 1//if pager is existent 
            , tbody = this.Table.querySelector('tbody')
        if (!tbody) {
            tbody = document.createElement("tbody");
            // tbody.style.display = "block";
            this.Table.appendChild(tbody);
        } else tbody.innerHTML = "";
        e.Data.forEach(d => {
            let btr = document.createElement('tr');
            btr['dataItem'] = d;
            this.OrderNo(btr, (orderNo as number)++);
            this.Checkbox(btr);
            this.Options.Columns.forEach(col => {
                btr.innerHTML += `<td>${typeof col.field === 'string' ? GetValue(d, col.field) : col.field(d)}</td>`
            });
            tbody.appendChild(btr);
        })
    }
    public Load() {
        this.Options.DataSource.Read();
    }
}
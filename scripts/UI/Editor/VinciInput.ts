import { GetValue } from './../../Utilities/DataSet';
import { DataSource } from './../../Utilities/DataSource';
import { VinciEditorBase, IVinciEditorBaseEvents } from './VinciEditorBase';
import { IVinciTableCol,VinciTable } from '../Module/VinciTable';
import { Extend } from '../../Utilities/Extend';
export interface VinciInputOptions{
    Type?:string
    /**自动完成的字段 */
    AutoComplete?:boolean
    Columns?: Array<IVinciTableCol>
    /**包含datasource 的容器 */
    ItemsArea?:HTMLDivElement
    DataSource?: DataSource
    ValueField?: string
    TextField?: string
}
export interface IVinciInputEvents extends IVinciEditorBaseEvents{
    OnDblclick:string
}
export class VinciInput<OptionsT extends VinciInputOptions> extends VinciEditorBase<VinciInputOptions> {
    // public Events:IVinciInputEvents =Extend({OnDblclick: "OnDblclick"},this.Events);// Extend(super.Events,)
    private InputChangeEvent;
    protected get DefaultOptions(){
        return {Type:"text",AutoComplete:false}
    }
    constructor(element: HTMLInputElement, options?:VinciInputOptions) {
        super(element, options)
        if (!this.Element.classList.contains("form-control"))
            this.Element.classList.add("form-control")
        }
    protected Initialization(){
        let elem=this.Element as HTMLInputElement;
        elem.type = this.Options.Type;
        if(this.Options.DataSource&&this.Options.AutoComplete){
            this.InitAutoComplete();
        }
        else
        elem.addEventListener("change",this.InputChangeEvent||(this.InputChangeEvent=this.ValueChanged.bind(this)));
    }
    protected InitAutoComplete(){
        let table=new VinciTable(this.Options.ItemsArea,{Columns:this.Options.Columns,DataSource:this.Options.DataSource});
        table.Bind(table.Events.OnDblclick,e=>{
             if (e.Value) {
            (this.Element as HTMLInputElement).value = GetValue(e.Value, this.Options.TextField).toString();
            this.SetCurrentItems([e.Value]);
            let value= GetValue(e.Value, this.Options.ValueField)
            this.SetValue(value);
            this.SetState(this.Events.Change,value);
        }})
        this.Options.DataSource.Success=(e)=>{
            let filterValue=(this.Element as HTMLInputElement).value;
            let rightData=e.Data;
            if(filterValue)
            rightData=e.Data.filter(d=>
                new RegExp(filterValue.toLowerCase()).test((GetValue(d,this.Options.TextField) as string).toLowerCase())
            )
            table.SetDataSource(new DataSource({Data:rightData}));
        }
        this.Element.addEventListener("change",()=>{
            this.Options.DataSource.Read();
        });
        if(this.Options.ItemsArea){

        }
    }
    protected SetValue(value){
        (this.Element as HTMLInputElement).value=value;
        super.SetValue(value);
    }
    protected ValueChanged(e:Event){
        let value= (e.target as HTMLInputElement).value;
        super.SetValue(value)
    }
    public Destroy(){
        if(this.InputChangeEvent){this.Element.removeEventListener("change",this.InputChangeEvent);delete this.InputChangeEvent;}
        super.Destroy();
    }
}

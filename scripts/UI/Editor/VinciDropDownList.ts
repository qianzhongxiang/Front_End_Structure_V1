import { DataSource } from './../../Utilities/DataSource';
import { VinciEditorBase } from './VinciEditorBase';

export interface IVinciDropDownListOptions{
    ValueField?:string
    TextField?:string
    DataSource?:DataSource|any[]
}
export class VinciDropDownList extends VinciEditorBase<IVinciDropDownListOptions> {
    
    public get DefaultOptions() : IVinciDropDownListOptions {
        return {ValueField:"value",TextField:"text",DataSource:[]}
    }
    
    constructor(element?:HTMLDivElement,options?:IVinciDropDownListOptions){
        super(element,options);
    }
}

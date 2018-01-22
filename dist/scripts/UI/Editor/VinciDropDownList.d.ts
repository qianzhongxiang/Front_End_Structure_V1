import * as Utilities from './../../Utilities/DataSource';
import { VinciEditorBase } from './VinciEditorBase';
export interface IVinciDropDownListOptions {
    ValueField?: string;
    TextField?: string;
    DataSource?: Utilities.DataSource | any[];
}
export declare class VinciDropDownList<OptionsT> extends VinciEditorBase<IVinciDropDownListOptions> {
    DataSource: Utilities.DataSource;
    private UlClickEvent;
    private WrapperClickEvent;
    readonly DefaultOptions: IVinciDropDownListOptions;
    constructor(element: HTMLButtonElement, options?: IVinciDropDownListOptions);
    protected Initialization(): void;
    protected GenerateUL(ul: HTMLUListElement, data: any[]): void;
    private WrapperClick(e);
    private Selected(e);
    Destroy(): void;
}

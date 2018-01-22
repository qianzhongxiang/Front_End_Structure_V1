import { VinciLayerBase } from './VinciLayerBase';
export interface IVinciWindowOptions {
    AutoDestory?: boolean;
    Title?: string;
}
export declare class VinciWindow<OptionsT extends IVinciWindowOptions> extends VinciLayerBase<OptionsT> {
    MODELLAYER: string;
    protected readonly DefaultOptions: IVinciWindowOptions;
    constructor(element: HTMLDivElement, options?: OptionsT);
    /**
     * need to satisfiy rebuiding of widget.
     */
    protected Initialization(): void;
    private GenerateHeader();
    private GenerateContent();
    private GenerateFoot();
    Open(): void;
    Close(): void;
}

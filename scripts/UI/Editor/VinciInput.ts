import { VinciEditorBase } from './VinciEditorBase';
export interface VinciInputOptions{
    Type:string
}
export class VinciInput<OptionsT extends VinciInputOptions> extends VinciEditorBase<VinciInputOptions> {
    private InputChangeEvent;
    protected get DefaultOptions(){
        return {Type:"text"}
    }
    constructor(element?: HTMLInputElement, options?:VinciInputOptions) {
        let elem = element;
        if (!elem) {
            elem = document.createElement("input");
        }
        if (!elem.classList.contains("form-control"))
            elem.classList.add("form-control")
        super(elem, options)
        elem.type = this.Options.Type;
        elem.addEventListener("change",this.InputChangeEvent||(this.InputChangeEvent=this.ValueChanged.bind(this)));
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

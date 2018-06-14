import * as Patterns from '../Patterns/Composit';
import * as Utilities from './../Utilities/Extend';
export class VinciWidget<OptionsT> extends Patterns.Composit {
    protected get DefaultOptions():any{
        return {};
    }
    public Wrapper: HTMLElement
    constructor(public Element: HTMLElement, public Options:OptionsT = {} as OptionsT) {
        super();
        this.Wrapper = this.Element;
        this.Options=Utilities.Extend(this.DefaultOptions,this.Options)
        let className:string=this.constructor["name"];
        this.Element.dataset[className]=this.Id;
        this.Initialization();
    }
    /**
     * need to satisfiy rebuiding of widget.
     */
    protected Initialization() {

    }
    protected SetOptions(options:OptionsT){
        Utilities.Extend(this.Options=options, this.DefaultOptions)  
        this.Initialization();      
    }
    /**
     * Destroy; Just concerning the chirlren regardless other component because this is a widget not container
     */
    public Destroy(){
        if(this.Wrapper.parentNode)this.Wrapper.parentNode.removeChild(this.Wrapper);
        delete this.Wrapper;
        delete this.Element;
        super.Destroy();
    }
}
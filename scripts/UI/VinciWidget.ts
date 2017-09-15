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
        Utilities.Extend(this.Options, this.DefaultOptions)
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
    public Destroy(){
        if(this.Wrapper.parentNode)this.Wrapper.parentNode.removeChild(this.Wrapper);
        delete this.Wrapper;
        delete this.Element;
    }
}
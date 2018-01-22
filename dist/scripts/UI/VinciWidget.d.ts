import * as Patterns from '../Patterns/Composit';
export declare class VinciWidget<OptionsT> extends Patterns.Composit {
    Element: HTMLElement;
    Options: OptionsT;
    protected readonly DefaultOptions: any;
    Wrapper: HTMLElement;
    constructor(Element: HTMLElement, Options?: OptionsT);
    /**
     * need to satisfiy rebuiding of widget.
     */
    protected Initialization(): void;
    protected SetOptions(options: OptionsT): void;
    /**
     * Destroy; Just concerning the chirlren regardless other component because this is a widget not container
     */
    Destroy(): void;
}

import { ObserverableWMediator } from './ObserverableWithMediator';
export interface IComposit {
    Id: string;
    Parent: IComposit;
    Add(Obj: IComposit): IComposit;
    Remove(Obj: IComposit): IComposit;
    GetChild(id: string): IComposit;
    Destroy(): any;
}
export declare abstract class Composit extends ObserverableWMediator implements IComposit {
    Id: string;
    Parent: IComposit;
    private Children;
    private static Coms;
    /**
     * Get
     * @param filter can be Id or filter function
     */
    static Get(filter: string | ((com: IComposit) => boolean)): IComposit;
    private static GetViaFunction(fn);
    constructor();
    Add(Obj: IComposit): IComposit;
    Remove(Obj: IComposit): IComposit;
    GetChild(id: string): IComposit;
    Destroy(): void;
}

import { ObserverableWMediator } from './ObserverableWithMediator';
import * as Utilities from './../Utilities/Guid';

export interface IComposit {
    Id: string //Guid
    Parent: IComposit
    Add(Obj: IComposit): IComposit
    Remove(Obj: IComposit): IComposit
    GetChild(id: string): IComposit
    Destroy()
}
export abstract class Composit extends ObserverableWMediator implements IComposit {
    public Id: string
    public Parent: IComposit
    private Children: Array<IComposit>=[]
    public Add(Obj: IComposit): IComposit {
        Obj.Parent = Obj;
        if (!this.GetChild(Obj.Id))
            this.Children.push(Obj);
        return Obj;
    }
    public Remove(Obj: IComposit): IComposit {
        if (!Obj) return;
        return this.Children.splice(this.Children.indexOf(Obj), 1)[0];
    }
    public GetChild(id: string): IComposit {
        if (!Utilities.Guid.Validate(id)) {
            console.log("id:" + id + " is not valid Guid ");
            return;
        }
        return this.Children.filter(c => c.Id == id)[0];
    }
    public Destroy() {
        if (this.Parent) {
            this.Parent.Remove(this);
            delete this.Parent;
        }
        if (this.Children) {
            this.Children.forEach(c => { c.Parent = undefined; c.Destroy(); });
            delete this.Children;
        }
    }
    constructor() {
        super();
        this.Id = Utilities.Guid.NewId();
    }
}

/// <reference path="../utilities/Guid.ts" />

namespace Patterns {
    export interface IComposit {
        Id: string //Guid
        Parent: IComposit
        Add(Obj: IComposit): IComposit
        Remove(Obj: IComposit): IComposit
        GetChild(id: string): IComposit
        Destroy()
    }
    export abstract class Composit implements IComposit {
        public Id: string
        public Parent: IComposit
        private Children: Array<IComposit>
        public Add(Obj: IComposit): IComposit {
            Obj.Parent = Obj;
            if (!this.GetChild(Obj.Id))
                this.Children.push(Obj);
            return Obj;
        }
        public Remove(Obj: IComposit): IComposit {
            return this.Children.splice(this.Children.indexOf(Obj), 1)[0];
        }
        public GetChild(id: string): IComposit {
            return this.Children.find(c => c.Id == id);
        }
        public Destroy() {
            if (this.Parent) {
                this.Parent.Remove(this);
                delete this.Parent;
            }
            if (this.Children) {
                this.Children.forEach(c => {c.Parent=undefined;c.Destroy();});
                delete this.Children;
            }
        }
        constructor() {
            this.Id = Utilities.Guid.NewId();
        }
    }
}
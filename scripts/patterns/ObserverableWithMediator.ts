import { Mediator } from "./Mediator";
import { ObserverStateType, Observerable, ObserverMsg } from './Observerable';

class ObserMediator extends Mediator {
    Register(subject: ObserverableWMediator, fn: Function, type?: any) {
        super.Register(subject, fn, type)
    }
    Change(subject: ObserverableWMediator, type?: any) {
        super.Change(subject, type)
    }
    Unregister(subject: ObserverableWMediator, fn: Function, type?: any) {
        super.Register(subject, fn, type)
    }
}
let mediator=new ObserMediator();

export class ObserverableWMediator extends Observerable {
    protected SetState(type: ObserverStateType,value?:any){
        if(value){
            let state=this.StateTable.filter(s=>s.type==type)[0];
            if(state){
                if(value!==state.value)
                {
                    mediator.Change(this,type);
                }
            }else{this.StateTable.push(state);
                mediator.Change(this,type);
            }
        }
    }
    public Bind(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        mediator.Register(this,fn,type)
    }
    public Once(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        throw new Error("Method not implemented.");
    }
}

import { Mediator } from "./Mediator";
import { ObserverStateType, Observerable, ObserverMsg } from './Observerable';

class ObserMediator extends Mediator {
    Register(subject: string|ObserverableWMediator, fn: Function, type?: any) {
       super.Register(typeof subject ==="string"?subject: subject.Id, fn, type)
    }
    Change(subject:  string|ObserverableWMediator, type?: any) {
        super.Change(typeof subject ==="string"?subject: subject.Id, type)
    }
    Unregister(subject:  string|ObserverableWMediator, fn: Function, type?: any) {
        super.Register(typeof subject ==="string"?subject: subject.Id,fn, type)
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
    /**
     * Bind [, ownObj?: Object, ...otherData: any[]]可直接对fn进行bind
     * @param type 
     * @param fn 
     */
    public Bind(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void) {
        mediator.Register(this,fn,type)
    }
    /**
     * Once [, ownObj?: Object, ...otherData: any[]]可直接对fn进行bind
     * @param type 
     * @param fn 
     */
    public Once(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void) {
        mediator.Register(this,fn,type)
    }
}

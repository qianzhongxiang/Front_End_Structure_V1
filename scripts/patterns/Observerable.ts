import * as Utilities from './../Utilities/Guid';

export enum ObserverStateType {
}
export class ObserverMsg {
    public Sender: IObseverable
    public Type: ObserverStateType
    public Value: any
}
export interface IObseverable {
    GetState(type: ObserverStateType);
    Bind(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[])
    Once(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[])
}
export abstract class Observerable implements IObseverable {
    public Id:string
    constructor(){
        this.Id = Utilities.Guid.NewId();
    }
    protected StateTable:Array<{type:ObserverStateType,value?:any}>=[]
    /**
     * 设置状态 如果有改变 会自动notice
     * @param type 
     * @param value 
     */
    protected SetState(type: ObserverStateType,value?:any) {
        if(value){
            let state=this.StateTable.filter(s=>s.type==type)[0];
            if(state){
                if(value!==state.value)
                {
                    //change
                }
            }else{this.StateTable.push(state);
            //change
            }
        }
    }
    public GetState(type: ObserverStateType) {
        let state=this.StateTable.filter(s=>s.type==type)[0];
        if(state)return state.value;
    }
    public Bind(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        throw new Error("Method not implemented.");
    }
    public Once(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        throw new Error("Method not implemented.");
    }
}

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
    private SetState(type: ObserverStateType) {

    }
    public GetState(type: ObserverStateType) {
        throw new Error("Method not implemented.");
    }
    public Bind(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        throw new Error("Method not implemented.");
    }
    public Once(type: ObserverStateType, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]) {
        throw new Error("Method not implemented.");
    }
}

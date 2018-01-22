export declare class ObserverMsg {
    Sender: IObseverable;
    Type: string;
    Value: any;
}
export interface IObseverable {
    Id: string;
    GetState(type: string): any;
    Bind(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]): any;
    Once(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]): any;
}
export declare abstract class Observerable implements IObseverable {
    Id: string;
    Events: Object;
    constructor();
    protected StateTable: Array<{
        type: string;
        value?: any;
    }>;
    /**
     * 设置状态 如果有改变 会自动notice
     * @param type
     * @param value
     */
    protected SetState(type: string, value?: any): void;
    GetState(type: string): any;
    Bind(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]): void;
    Once(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void, ownObj?: Object, ...otherData: any[]): void;
}

import * as DS from "../DataStructures/LinkList";
export interface IMediator {
    Register(subject: any, fn: Function, type?: any): any;
    Change(subject: any, type?: any): any;
    Unregister(subject: any, fn: Function, type?: any): any;
}
export declare class MediaNode extends DS.LNode {
    Type: string;
}
export declare abstract class Mediator implements IMediator {
    protected Storage: Array<DS.LinkList<MediaNode>>;
    Register(id: string, fn: Function, type?: any): void;
    Change(id: string, type?: any): void;
    Unregister(id: string, fn: Function, type?: any): void;
}

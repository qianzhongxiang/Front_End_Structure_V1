import * as DS from "../DataStructures/LinkList";

export interface IMediator {
    Register(subject, fn: Function, type?)
    Change(subject, type?)
    Unregister(subject, fn: Function, type?)
}
class MediaNode extends DS.LNode {
    public Type: string
}
export abstract class Mediator implements IMediator {
    private Storage: Array<[string, DS.LinkList<MediaNode>]>
    Register(id: string, fn: Function, type?: any) {
        throw new Error("Method not implemented.");
    }
    Change(id: string, type?: any) {
        throw new Error("Method not implemented.");
    }
    Unregister(id: string, fn: Function, type?: any) {
        throw new Error("Method not implemented.");
    }
}

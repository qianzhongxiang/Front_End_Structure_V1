///<reference path="../DataStructures/LinkList.ts"/>
namespace Patterns{
    export interface IMediator{
        Register(subject,fn:Function,type?)
        Change(subject,type?)
        Unregister(subject,fn:Function,type?)
    }
    class MediaNode extends DS.LNode{
        public Type:string
    }
    export abstract class Mediator implements IMediator {
        private Storage:Array<[string,DS.LinkList<MediaNode>]>
        Register(subject: any, fn: Function, type?: any) {
            throw new Error("Method not implemented.");
        }
        Change(subject: any, type?: any) {
            throw new Error("Method not implemented.");
        }
        Unregister(subject: any, fn: Function, type?: any) {
            throw new Error("Method not implemented.");
        }
    }
}
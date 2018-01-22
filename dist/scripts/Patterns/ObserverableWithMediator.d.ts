import { Observerable, ObserverMsg } from './Observerable';
export declare class ObserverableWMediator extends Observerable {
    protected SetState(type: string, value?: any): void;
    /**
     * Bind [, ownObj?: Object, ...otherData: any[]]可直接对fn进行bind
     * @param type
     * @param fn
     */
    Bind(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void): void;
    /**
     * Once [, ownObj?: Object, ...otherData: any[]]可直接对fn进行bind
     * @param type
     * @param fn
     */
    Once(type: string, fn: (msg: ObserverMsg, ...parameters: any[]) => void): void;
}

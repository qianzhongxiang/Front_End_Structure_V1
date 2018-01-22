import { Draggable } from './DraggableComponent';
import { ObserverableWMediator } from './../Patterns/ObserverableWithMediator';
export declare class GridStacker extends ObserverableWMediator {
    Element: HTMLDivElement;
    private _edited;
    private Items;
    private Coms;
    Events: {
        DropItem: string;
    };
    Edited: boolean;
    RegistCom(com: Draggable): void;
    DropItem(id: number): boolean;
    constructor(Element: HTMLDivElement);
    Destroy(): void;
    /**
     * ToString done
     */
    ToString(): string;
    AddWidget(el: Draggable, x: any, y: any, w: any, h: any, ap?: boolean): void;
    /**
     * ScriptAnalysis done
     * @param str rows be splited by ";""
     */
    ScriptAnalysis(str: string): boolean;
}

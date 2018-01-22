import * as Patterns from '../Patterns/Composit';
/**
 * Draggable; this is a container
 */
export declare class Draggable extends Patterns.Composit {
    Element: HTMLElement;
    sign: number;
    private component;
    private SpanBtns;
    Events: {
        DragStart: string;
    };
    Span: number;
    private DragStartEvent;
    Wrapper: HTMLElement;
    /**
     *
     * @param Element showning draggable handler
     * @param sign unique mark for saving
     * @param component real showing content
     */
    constructor(Element: HTMLElement, sign: number, component?: {
        Element: HTMLElement;
        Destroy?: () => void;
    });
    Destroy(): void;
    private Dragstart(e);
    private MouseOver(e);
    private MouseLeave(e);
    /**
     * real darggable component entity --done
     */
    ComponentEntity(): HTMLElement;
    DropIntoTrashCan(): void;
}
export declare class DraggableToolbar extends Patterns.Composit {
    Element: HTMLDivElement;
    Events: {
        OnEdit: string;
        OnSave: string;
        OnDroped: string;
    };
    private DropEventHander;
    private DragOverEventHander;
    constructor(Element: HTMLDivElement);
    /**
     * Initialize
     */
    Initialize(): void;
    private DropEvent(e);
    private DragOverEvent(e);
    SaveScript(): void;
    Destroy(): void;
}
export declare class DraggableContainer extends Patterns.Composit {
    Element: HTMLDivElement;
    private _edited;
    private ColSpan;
    private DragenterEvent;
    private DropEvent;
    private DragoverEvent;
    private DragendHandler;
    private UnitMark;
    RowHeight: number;
    private SpanExt;
    Edited: boolean;
    RegistCom(com: Draggable): void;
    constructor(Element: HTMLDivElement, script?: string);
    /**
     * Dragenter Event
     * @param e
     */
    private Dragenter(e);
    private Dragover(e);
    private Drop(e);
    private DragEnd(target, e);
    private MoveIn(target, source);
    private MoveOut(target, source);
    /**
     * 根据情况设置Row的类
     */
    private SetRowClass(row);
    Destroy(): void;
    /**
     * 再最底层始终保持有两排空的 done
     */
    ShowAndCreateRow(): boolean;
    private GenerateCol(ColSpan);
    HideAndRemoveRow(): boolean;
    /**
     * ToString done
     */
    ToString(): string;
    /**
     * ScriptAnalysis done
     * @param str rows be splited by ";""
     */
    ScriptAnalysis(str: string): boolean;
    private CreateNewRows(ColSpan);
}

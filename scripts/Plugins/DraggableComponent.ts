import * as Patterns from '../Patterns/Composit';
/**
 * Draggable; this is a container 
 */
export class Draggable extends Patterns.Composit {
    public Span: number = 12
    private DragStartEvent
    constructor(public Element: HTMLDivElement) {
        super()
        this.Element.draggable = true;
        this.Element.addEventListener("dragstart", this.DragStartEvent = this.Dragstart.bind(this));
    }
    public Destroy() {
        var components = this.Element.getElementsByClassName("");
        components.forEach(c => {
            //Destroy c
        });
        super.Destroy();
    }
    private Dragstart(e: DragEvent) {
        e.dataTransfer.setData("Id", this.Id);
    }
}

export class DraggableContainer extends Patterns.Composit {
    private _edited: boolean = false;
    private ColSpan: number = 12;
    private DragenterEvent;
    private DropEvent;
    public get Edited(): boolean {
        return this._edited;
    }
    public set Edited(v: boolean) {
        if (v === this._edited) return;
        if (v) {
            if (!this.DragenterEvent)
                this.Element.addEventListener("dragenter", this.DragenterEvent = this.Dragenter.bind(this))
            if (!this.DropEvent)
                this.Element.addEventListener("drop", this.DropEvent = this.Drop.bind(this));
            this._edited = v;
        }
        if (!v && this.HideAndRemoveRow()) {
            if (this.DragenterEvent)
                this.Element.removeEventListener("dragenter", this.DragenterEvent)
            if (this.DropEvent)
                this.Element.removeEventListener("drop", this.DropEvent);
            this._edited = v;
        }
    }

    constructor(public Element: HTMLDivElement, script?: string) {
        super();
        if (script) {
            this.ScriptAnalysis(script);
        }
    }
    /**
     * Dragenter Event
     * @param e 
     */
    private Dragenter(e: DragEvent) {
        //get component coincide with e.dataTransfer ["Id"]
        let com: Draggable
        this.ColSpan = com.Span;
        this.ShowAndCreateRow();
    }
    private Drop(e: DragEvent) {
        let target = e.target as HTMLDivElement
        if (target)//TODO ==
        {
            //get component coincide with e.dataTransfer ["Id"]
            let com: Draggable
            if (com.Element.parentElement)
                com.Element.parentElement.classList.remove("full");
            target.appendChild(com.Element);
            target.classList.add("full");
            target.parentElement.classList.remove("empty");
        }
    }
    public Destroy() {
        //DragenterEvent
        //DragendEvent
        //Draggable components Destroion
        super.Destroy();
    }
    /**
     * 再最底层始终保持有两排空的
     */
    public ShowAndCreateRow(): boolean {
        //existing layer show
        let rows = this.Element.getElementsByClassName("row");
        rows.forEach(r => {
            let sign = 0, subDiv = r.firstChild as HTMLDivElement, arry = [];
            while (subDiv) {
                arry.push(subDiv);
                subDiv = subDiv.nextSibling as HTMLDivElement;
                if (subDiv.classList.contains("full")) { arry = []; sign = 0; continue; }
                if (++sign == this.ColSpan) {
                    while (arry.length) r.removeChild(arry.pop());
                    let newDiv = document.createElement("div");
                    newDiv.classList.add("col-" + this.ColSpan);
                    if (subDiv)
                        r.insertBefore(newDiv, subDiv);
                    else r.appendChild(newDiv);
                }
            }
        });

        //create new layer
        while (this.Element.getElementsByClassName("empty").length < 2) {
            let div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("empty");
            let count = Math.floor(12 / this.ColSpan);
            for (let i = 0; i < count; i++) {
                let subDiv = document.createElement("div");
                subDiv.classList.add("col-" + this.ColSpan);
                div.appendChild(subDiv);
            }
        }

        this.Element.appendChild()
        return true;
    }
    public HideAndRemoveRow(): boolean {
        //remove redundant layer

        //hide current layer

        return true;
    }
    public ToString(): string {
        //genrate string of script
        return "";
    }
    public ScriptAnalysis(str: string): boolean {

        return true;
    }
}
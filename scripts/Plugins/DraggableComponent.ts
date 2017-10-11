import * as Patterns from '../Patterns/Composit';
/**
 * Draggable; this is a container 
 */
export class Draggable extends Patterns.Composit {
    public Span: number = 12
    private DragStartEvent
    constructor(public Element: HTMLElement, private component?: { Element: HTMLElement, Destroy?: () => void }) {
        super()
        this.Element.draggable = true;
        this.Element.addEventListener("dragstart", this.DragStartEvent = this.Dragstart.bind(this));
    }
    public Destroy() {
        if (this.component) {
            if (this.component.Destroy) this.component.Destroy();
            delete this.component;
        }
        var components = this.Element.querySelectorAll("");//TODO destory them

        super.Destroy();
    }
    private Dragstart(e: DragEvent) {
        e.dataTransfer.setData("Id", this.Id);
    }
    /**
     * real darggable component entity --done
     */
    public ComponentEntity(): HTMLElement {
        if (this.component)
            return this.component.Element;
        else this.Element;
    }
    private DropIntoTrashCan(){

    }
}

export class DraggableToolbar extends Patterns.Composit {
    private Button: HTMLButtonElement
    private RemoveArea: HTMLDivElement
    public Events={
        OnEdit:"OnEdit",
        OnSave:"OnSave",
        OnDroped:"OnDroped",
    }
    constructor(public Element: HTMLDivElement) {
        super();
        this.Initialize();
    }
    /**
     * Initialize
     */
    public Initialize() {
        if (!this.Button) {
            this.Button = document.createElement("button");
            this.Button.innerText = "Edit";
            this.Button.onclick = (e: MouseEvent) => {
                let btn = e.target as HTMLButtonElement;
                if (btn.classList.contains("btn-primary")) {
                    btn.classList.remove("btn-primary");
                    btn.classList.add("btn-success");
                    btn.innerText = "Save";
                    this.SetState(this.Events.OnEdit)
                } else {
                    this.SaveScript();
                    btn.classList.remove("btn-success");
                    btn.classList.add("btn-primary");
                    btn.innerText = "Edit";
                    this.SetState(this.Events.OnSave)
                }
            }
            this.Button.classList.add("btn");
            this.Button.classList.add("btn-primary");
            this.Button.classList.add("float-left");
            this.Element.appendChild(this.Button);
        }
    }
    public SaveScript(){

    }
    public Destroy() {
        if (this.Element.parentElement)
            this.Element.parentElement.removeChild(this.Element);
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
        Element.classList.add("DraggableContainer");
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
            target.appendChild(com.ComponentEntity());
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
     * 再最底层始终保持有两排空的 done
     */
    public ShowAndCreateRow(): boolean {
        //existing layer show --done
        let rows = this.Element.getElementsByClassName("row"), ext = new RegExp(/[col-\d+,col-sm-\d,col-md-\d,col-lg-\d,col-xl-\d]/),len=rows.length;
        for (var index = 0; index < len; index++) {
            var r = rows[index];
            let sign = 0, subDiv = r.firstChild as HTMLDivElement, arry = [];
            while (subDiv) {
                arry.push(subDiv);
                ext.exec(subDiv.getAttribute("class"));
                let span = parseInt(ext[0]);
                subDiv = subDiv.nextSibling as HTMLDivElement;
                if (subDiv.classList.contains("full")) { arry = []; sign = 0; continue; }
                if ((sign += span) == this.ColSpan) {
                    while (arry.length) r.removeChild(arry.pop());
                    let newDiv = document.createElement("div");
                    newDiv.classList.add("col-" + this.ColSpan);
                    newDiv.classList.add("DC-Col");
                    if (subDiv)
                        r.insertBefore(newDiv, subDiv);
                    else r.appendChild(newDiv);
                } 
            }
        }
        //create new layer --done
        while (this.Element.getElementsByClassName("empty").length < 2) {
            let div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("empty");
            let count = Math.floor(12 / this.ColSpan);
            for (let i = 0; i < count; i++) {
                let subDiv = document.createElement("div");
                subDiv.classList.add("col-" + this.ColSpan);
                subDiv.classList.add("DC-Col");
                div.appendChild(subDiv);
            }
            this.Element.appendChild(div);
        }

        return true;
    }
    public HideAndRemoveRow(): boolean {
        //remove redundant rows  done
        while (this.Element.lastElementChild.classList.contains("empty")) {
            this.Element.removeChild(this.Element.lastElementChild);
        }
        //hide current layer --not need for present

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
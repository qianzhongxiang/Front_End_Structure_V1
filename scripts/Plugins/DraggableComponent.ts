import * as Patterns from '../Patterns/Composit';
/**
 * Draggable; this is a container 
 */
export class Draggable extends Patterns.Composit {
    private SpanBtns = [{ text: "1/4", value: 3 }, { text: "1/3", value: 4 }, { text: "1/2", value: 6 }, { text: "1", value: 12 }]
    public Events = {
        DragStart: "DragStart"
    }
    public Span: number = 12
    private DragStartEvent
    public Wrapper: HTMLElement
    constructor(public Element: HTMLElement, private component?: { Element: HTMLElement, Destroy?: () => void }) {
        super()
        this.Wrapper = document.createElement("div");
        this.Wrapper.draggable = true;
        this.Wrapper.addEventListener("dragstart", this.DragStartEvent = this.Dragstart.bind(this));
        this.Wrapper.addEventListener("mouseover", this.MouseOver.bind(this));
        this.Wrapper.addEventListener("mouseleave", this.MouseLeave.bind(this));
        if (this.Element.parentNode) {
            this.Element.parentNode.insertBefore(this.Wrapper,this.Element);
        }
        this.Wrapper.appendChild(this.Element);
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
        e.dataTransfer.dropEffect = "move";
        this.SetState(this.Events.DragStart);
    }
    private MouseOver(e: MouseEvent) {
        if (this.Element.querySelector(".tooltip")) return;
        let tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.classList.add("bs-tooltip-bottom");
        tooltip.classList.add("bs-tooltip-bottom-docs");
        tooltip.setAttribute("role", "tooltip");
        let arrow = document.createElement("div");
        arrow.classList.add("arrow");
        tooltip.appendChild(arrow);
        let inner = document.createElement("div");
        inner.classList.add("tooltip-inner");
        this.SpanBtns.forEach(b => {
            let btn = document.createElement("button");
            btn.dataset["value"] = b.value.toString();
            btn.innerText = b.text;
            inner.appendChild(btn);
        })
        inner.addEventListener("click", (e: MouseEvent) => {
            let target = e.target as HTMLButtonElement;
            if (target instanceof HTMLButtonElement)
                this.Span = parseInt(target.dataset["value"]);
        })
        arrow.appendChild(inner);
        this.Wrapper.appendChild(tooltip);
    }
    private MouseLeave(e: MouseEvent) {
        let tooltip;
        if (tooltip = this.Element.querySelector(".tooltip"))
            this.Element.removeChild(tooltip);
    }
    /**
     * real darggable component entity --done
     */
    public ComponentEntity(): HTMLElement {
        if (this.component)
            return this.component.Element;
        else return this.Element;
    }
    private DropIntoTrashCan() {

    }
}

export class DraggableToolbar extends Patterns.Composit {
    private Button: HTMLButtonElement
    private RemoveArea: HTMLDivElement
    public Events = {
        OnEdit: "OnEdit",
        OnSave: "OnSave",
        OnDroped: "OnDroped",
    }
    constructor(public Element: HTMLDivElement) {
        super();
        this.Initialize();
    }
    /**
     * Initialize
     */
    public Initialize() {
        this.Element.style.height = "3em";
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
    public SaveScript() {

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
    private DragoverEvent;
    public RowHeight = 180;
    /**
     * 目前因为 GragEnter 中 dataTranfer.getData()无法使用
     */
    public CurrentGraggableId
    public get Edited(): boolean {
        return this._edited;
    }
    public set Edited(v: boolean) {
        if (v === this._edited) return;
        if (v) {
            if (!this.DragenterEvent)
                this.Element.addEventListener("dragenter", this.DragenterEvent = this.Dragenter.bind(this), false)
            if (!this.DropEvent)
                this.Element.addEventListener("drop", this.DropEvent = this.Drop.bind(this));
            if (!this.DragoverEvent)
                this.Element.addEventListener("dragover", this.DragoverEvent = this.Dragover.bind(this));
            this._edited = v;
        }
        if (!v && this.HideAndRemoveRow()) {
            if (this.DragenterEvent)
                this.Element.removeEventListener("dragenter", this.DragenterEvent)
            if (this.DropEvent)
                this.Element.removeEventListener("drop", this.DropEvent);
            if (this.DragoverEvent)
                this.Element.removeEventListener("dragover", this.DragoverEvent = this.Dragover.bind(this));
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
        e.preventDefault();
        //let id=e.dataTransfer.getData("text/plain");
        //get component coincide with e.dataTransfer ["Id"]
        let com: Draggable = Patterns.Composit.Get(this.CurrentGraggableId) as Draggable;
        this.ColSpan = com.Span;
        this.ShowAndCreateRow();
    }
    private Dragover(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
    }
    private Drop(e: DragEvent) {
        let target = e.target as HTMLDivElement
        if (target.classList.contains("DC-Col") && !target.classList.contains("full")) {
            let com: Draggable = Patterns.Composit.Get(e.dataTransfer.getData("Id")) as Draggable;
            let ele = com.ComponentEntity();
            if (ele.parentElement && ele.parentElement.classList.contains("DC-Col"))
                com.Element.parentElement.classList.remove("full");
            target.appendChild(ele);
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
        while (this.Element.lastElementChild && this.Element.lastElementChild.classList.contains("empty")) {
            this.Element.removeChild(this.Element.lastElementChild);
        }
        //existing layer show --done
        let rows = this.Element.getElementsByClassName("row"), ext = new RegExp(/[col-\d+,col-sm-\d,col-md-\d,col-lg-\d,col-xl-\d]/), len = rows.length;
        for (var index = 0; index < len; index++) {
            var r = rows[index];
            let sign = 0, subDiv = r.firstChild as HTMLDivElement, arry = [];
            while (subDiv) {
                arry.push(subDiv);
                ext.exec(subDiv.getAttribute("class"));
                let span = parseInt(ext[0]);
                if (subDiv.classList.contains("full")) { arry = []; sign = 0; subDiv = subDiv.nextSibling as HTMLDivElement; continue; }
                subDiv = subDiv.nextSibling as HTMLDivElement;
                if ((sign += span) == this.ColSpan) {
                    while (arry.length) r.removeChild(arry.pop());
                    let newDiv = document.createElement("div");
                    newDiv.classList.add("col-" + this.ColSpan);
                    newDiv.classList.add("DC-Col");
                    newDiv.classList.add("border");
                    newDiv.classList.add("border-success");
                    newDiv.style.height = "100%";
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
            div.style.height = this.RowHeight + "px";
            let count = Math.floor(12 / this.ColSpan);
            for (let i = 0; i < count; i++) {
                let subDiv = document.createElement("div");
                subDiv.classList.add("col-" + this.ColSpan);
                subDiv.classList.add("DC-Col");
                subDiv.classList.add("border");
                subDiv.classList.add("border-success");
                subDiv.style.height = "100%";
                div.appendChild(subDiv);
            }
            this.Element.appendChild(div);
        }

        return true;
    }
    public HideAndRemoveRow(): boolean {
        //remove redundant rows  done
        while (this.Element.lastElementChild && this.Element.lastElementChild.classList.contains("empty")) {
            this.Element.removeChild(this.Element.lastElementChild);
        }
        //hide current layer --not need for present
        //subDiv.classList.add("border");
        // subDiv.classList.add("border-success");
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
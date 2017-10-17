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
            this.Element.parentNode.insertBefore(this.Wrapper, this.Element);
        }
        this.Wrapper.appendChild(this.Element);
        this.Id
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
        if (this.Wrapper.querySelector(".tooltip")) return;
        let tooltip = document.createElement("div");
        tooltip.style.opacity = "1";
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
            let btn = document.createElement("a");
            btn.dataset["value"] = b.value.toString();
            btn.innerText = b.text;
            btn.href = "javascript:void(0);";
            inner.appendChild(document.createTextNode(" "));
            inner.appendChild(btn);
        })
        inner.addEventListener("click", (e: MouseEvent) => {
            let target = e.target as HTMLAnchorElement;
            if (target instanceof HTMLAnchorElement) {
                this.Span = parseInt(target.dataset["value"]);
                this.MouseLeave(e);
            }
        })
        tooltip.appendChild(inner);
        this.Wrapper.appendChild(tooltip);
    }
    private MouseLeave(e: MouseEvent) {
        let tooltip;
        if (tooltip = this.Wrapper.querySelector(".tooltip"))
            this.Wrapper.removeChild(tooltip);
    }
    /**
     * real darggable component entity --done
     */
    public ComponentEntity(): HTMLElement {
        if (this.component)
            return this.component.Element;
        else return this.Wrapper;
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

    public get Edited(): boolean {
        return this._edited;
    }
    public set Edited(v: boolean) {
        if (v === this._edited) return;
        if (v) {
            if (!this.DragenterEvent)
                this.Element.addEventListener("dragenter", this.DragenterEvent = this.Dragenter.bind(this), false)
            if (!this.DropEvent)
                document.addEventListener("drop", this.DropEvent = this.Drop.bind(this), false);
            if (!this.DragoverEvent)
                this.Element.addEventListener("dragover", this.DragoverEvent = this.Dragover.bind(this), false);
            this._edited = v;
        }
        if (!v && this.HideAndRemoveRow()) {
            if (this.DragenterEvent)
                this.Element.removeEventListener("dragenter", this.DragenterEvent)
            if (this.DropEvent)
                this.Element.removeEventListener("drop", this.DropEvent);
            if (this.DragoverEvent)
                this.Element.removeEventListener("dragover", this.DragoverEvent);
            this._edited = v;
        }
    }
    public RegistCom(com: Draggable) {
        com.Bind("DragStart", msg => {
            if (!this.Edited) return;
            /**
            * 目前因为 GragEnter 中 dataTranfer.getData()无法使用
            */
            let com: Draggable = Patterns.Composit.Get(msg.Sender.Id) as Draggable;
            this.ColSpan = com.Span;
            this.ShowAndCreateRow();
        });
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

    }
    private Dragover(e: DragEvent) {
        e.preventDefault();
        // e.dataTransfer.dropEffect = "move"
    }
    private Drop(e: DragEvent) {
        e.preventDefault();
        let target = e.target as HTMLDivElement
        if (!target.classList.contains("DC-Col")) target = target.parentElement as HTMLDivElement;
        if (target.classList.contains("DC-Col") && !target.classList.contains("full")) {
            let com: Draggable = Patterns.Composit.Get(e.dataTransfer.getData("Id")) as Draggable
                , ext = new RegExp(/col-\d+|col-sm-\d+|col-md-\d+|col-lg-\d+|col-xl-\d+/)
                , ms = target.getAttribute("class").match(ext)
                , span = parseInt((ms[0] as string).match(/\d+/)[0]);
            if (span != com.Span) return;
            let ele = com.ComponentEntity();
            if (ele.parentElement && ele.parentElement.classList.contains("DC-Col")) {
                ele.parentElement.classList.remove("full");
                this.SetRowClass(ele.parentElement.parentElement);
            }
            target.innerHTML = "";
            target.appendChild(ele);
            target.classList.add("full");
            this.SetRowClass(target.parentElement)
            this.ShowAndCreateRow();
        }
    }
    /**
     * 根据情况设置Row的类
     */
    private SetRowClass(row: HTMLElement) {
        let sub = row.querySelector(".full");
        if (sub) row.classList.remove("empty");
        else row.classList.add("empty");
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
        let rows = this.Element.getElementsByClassName("row"), ext = new RegExp(/col-\d+|col-sm-\d+|col-md-\d+|col-lg-\d+|col-xl-\d+/), len = rows.length;
        for (var index = 0; index < len; index++) {
            var r = rows[index];
            let sign = 0, subDiv = r.querySelector(".DC-Col:not(.full)") as HTMLDivElement, arry = [];
            while (subDiv) {
                arry.push(subDiv);
                let ms = subDiv.getAttribute("class").match(ext), span = parseInt((ms[0] as string).match(/\d+/)[0])
                    , next = subDiv.nextSibling as HTMLDivElement
                sign += span
                if (!next || next.classList.contains("full")) {
                    if (sign >= this.ColSpan) {
                        while (arry.length) r.removeChild(arry.pop());
                        while (sign >= this.ColSpan) {
                            sign -= this.ColSpan;
                            let newDiv = this.GenerateCol(this.ColSpan);
                            if (next)
                                r.insertBefore(newDiv, next);
                            else r.appendChild(newDiv);
                        }
                    }
                    if (sign > 0) {
                        let newDiv = this.GenerateCol(sign);
                        if (next)
                            r.insertBefore(newDiv, next);
                        else r.appendChild(newDiv);
                    }
                    arry = []; sign = 0;
                }
                //skip full column
                while (next && next.classList.contains("full")) {
                    next = subDiv.nextSibling as HTMLDivElement;
                }

                subDiv = next
            }
        }
        let l = this.Element.children.length
        let rs = this.Element.querySelectorAll(".row:not(.empty)");
        if (rs.length > 0) {
            let nodes = Array.prototype.slice.call(this.Element.children);
            l = l - nodes.indexOf(rs[rs.length - 1]) - 1;
        }
        // if (last) {
        //     let nodes = Array.prototype.slice.call(this.Element.children);
        //     l = l - nodes.indexOf(last) - 1;
        // }
        //create new layer --done
        while (l < 2) {
            let div = document.createElement("div");
            div.classList.add("row");
            div.classList.add("empty");
            div.style.height = this.RowHeight + "px";
            let count = Math.floor(12 / this.ColSpan);
            for (let i = 0; i < count; i++) {
                div.appendChild(this.GenerateCol(this.ColSpan));
            }
            this.Element.appendChild(div);
            l++;
        }
        while (l > 2) {
            this.Element.removeChild(this.Element.lastElementChild);
            l--;
        }

        return true;
    }
    private GenerateCol(ColSpan: number): HTMLDivElement {
        let subDiv = document.createElement("div");
        subDiv.classList.add("col-" + this.ColSpan);
        subDiv.classList.add("DC-Col");
        subDiv.style.height = "100%";
        subDiv.style.position = "relative";
        let border = document.createElement("div");
        border.classList.add("border");
        border.classList.add("border-success");
        border.style.borderStyle = "dotted";
        border.style.position = "absolute";
        border.style.top = "0";
        border.style.left = "0";
        border.style.bottom = "0";
        border.style.right = "0";
        border.classList.add("m-1");
        subDiv.appendChild(border);
        return subDiv;
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
        this.HideAndRemoveRow();
        //genrate string of script
        return "";
    }
    public ScriptAnalysis(str: string): boolean {
        let l1 = str.split("|"), rN: number, rows: Array<string>, strRCom: Array<string> = l1[1].split(";");
        rN = parseInt((rows = l1[0].split(";")).shift());
        if(rN!=rows.length||rN!=strRCom.length){console.error("rN!=rows.length||rN!=strRCom.length");return false;}
        rows.forEach(r=>{

        });
        strRCom.forEach(rc=>{

        });
        return true;
    }
}
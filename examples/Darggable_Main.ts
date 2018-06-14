import { DraggableToolbar, DraggableContainer, Draggable } from './../src/Plugins/DraggableComponent';
class Controller {
    constructor() {
        document.body.classList.add("container")
        let row = document.createElement("div");
        row.classList.add("row");
        document.body.appendChild(row);

        let div = document.createElement("div");
        div.classList.add("col-8");
        row.appendChild(div);
        let toolbar = document.createElement("div");
        div.appendChild(toolbar);
        let dT = new DraggableToolbar(toolbar);

        let gragContainer = document.createElement("div");
        gragContainer.style.height = "800px";
        gragContainer.style.width = "100%";
        gragContainer.classList.add("float-left", "border", "border-secondary")
        div.appendChild(gragContainer);
        let dC = new DraggableContainer(gragContainer);
        dT.Bind(dT.Events.OnEdit, () => dC.Edited = true)
        dT.Bind(dT.Events.OnSave, () => dC.Edited = false)
        dT.Bind(dT.Events.OnDroped, () => { })

        //buttons
        let testElement = document.createElement("div");
        testElement.innerHTML = "This is test article for dragging.";
        let objectContainer = document.createElement("div");
        objectContainer.classList.add("col-4");
        row.appendChild(objectContainer);
        let o1 = document.createElement("button");
        o1.innerText = "o1";
        objectContainer.appendChild(o1);
        let oo1 = new Draggable(o1, 1);
        let o2 = document.createElement("button");
        o2.innerText = "o2"
        objectContainer.appendChild(o2);
        let oo2 = new Draggable(o2, 2);
        let o3 = document.createElement("button");
        o3.innerText = "o3"
        objectContainer.appendChild(o3);
        let oo3 = new Draggable(o3, 3, { Element: testElement });
        dC.RegistCom(oo1);
        dC.RegistCom(oo2);
        dC.RegistCom(oo3);
    }
}

new Controller();
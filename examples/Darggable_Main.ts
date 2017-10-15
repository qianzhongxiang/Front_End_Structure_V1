import { DraggableToolbar, DraggableContainer, Draggable } from './../scripts/Plugins/DraggableComponent';
class Controller{
    constructor(){
        let objectContainer=document.createElement("div");
        document.body.appendChild(objectContainer);

        let toolbar=document.createElement("div");
        document.body.appendChild(toolbar);
        let dT=new DraggableToolbar(toolbar);
        
       
        let gragContainer=document.createElement("div");
        gragContainer.style.height="800px";
        document.body.appendChild(gragContainer);
        let dC=new DraggableContainer(gragContainer);
        dT.Bind(dT.Events.OnEdit,()=>dC.Edited=true)
        dT.Bind(dT.Events.OnSave,()=>dC.Edited=false)
        dT.Bind(dT.Events.OnDroped,()=>{})
        ///test objects
        let o1=document.createElement("button");
        o1.innerText="o1";
        objectContainer.appendChild(o1);
        let oo1=new Draggable(o1);
        let o2=document.createElement("button");
        o2.innerText="o2"
        objectContainer.appendChild(o2);
        let oo2=new Draggable(o2);
        let o3=document.createElement("button");
        o3.innerText="o3"
        objectContainer.appendChild(o3);
        let oo3=new Draggable(o3);
        dC.RegistCom(oo1);
        dC.RegistCom(oo2);
        dC.RegistCom(oo3);
    }
}

new Controller();
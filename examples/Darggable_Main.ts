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
        dT.Bind("OnEdit",()=>{
            dC.Edited=true;})
        dT.Bind("OnSave",()=>{
            dC.Edited=false;})
        dT.Bind("OnDroped",()=>{})
        ///test objects
        let o1=document.createElement("button");
        o1.innerText="o1"
        objectContainer.appendChild(o1);
        new Draggable(o1);
        let o2=document.createElement("button");
        o2.innerText="o2"
        objectContainer.appendChild(o2);
        new Draggable(o2);
        let o3=document.createElement("button");
        o3.innerText="o3"
        objectContainer.appendChild(o3);
        new Draggable(o3);
    }
}

new Controller();
import { DataSource } from './../scripts/Utilities/DataSource';
import { VinciSearcher } from "../scripts/UI/Editor/VinciSearcher";

let input=document.createElement("input"), ds=new DataSource({Data:[{Value:"value",Text:"text"}]})
document.body.appendChild(input);
new VinciSearcher(input,{DataSource:ds,Columns:[{field:"Value"},{field:"Text"}],TextField:'Text',ValueField:'Value'});
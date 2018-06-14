import { DataSource } from './../src/Utilities/DataSource';
import { VinciSearcher } from "../src/UI/Editor/VinciSearcher";

let input = document.createElement("input"), ds = new DataSource({ Data: [{ Value: "value", Text: "text" }] })
document.body.appendChild(input);
new VinciSearcher(input, { DataSource: ds, Columns: [{ field: "Value" }, { field: "Text" }], TextField: 'Text', ValueField: 'Value' });
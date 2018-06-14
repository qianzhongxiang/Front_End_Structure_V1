import { VinciInput } from './../src/UI/Editor/VinciInput';
import { DataSource } from '../src/Utilities/DataSource';
export class Input {
    constructor() {
        let div = document.createElement("div");
        let input = document.createElement("input");
        let items = document.createElement("div");
        div.appendChild(input)
        div.appendChild(items)
        div.style.width = "200px";
        document.body.appendChild(div);
        let vinput = new VinciInput(input, {
            Type: "text", AutoParameters: {
                Columns: [{ title: "name", field: "name" }, { title: "code", field: "code" }]
                , TextField: "name", ItemsArea: items, ValueField: "code", DataSource: new DataSource({ Data: [{ name: "1#", code: "1#" }, { name: "2#", code: "2#" }, { name: "3#", code: "3#" }] })
            }
        })
        vinput.Bind(vinput.Events.Change, e => {
            alert(`change:${e.Value}`)
        })
    }
}
new Input();
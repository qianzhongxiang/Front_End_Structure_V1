import { Extend } from './Extend';
export class Ajax {
    private oAjax: XMLHttpRequest
    constructor(public options: { url: string, data?: any, async?: boolean, method?: string }) {
        this.options=Extend(this.options, { async: true, method: "GET" })
        this.configOAjax()
    }
    done(fn?: (data) => void) {
        let that = this;
        if (fn)
            that.oAjax.onreadystatechange = () => {
                if (that.oAjax.readyState == 4)
                    if (that.oAjax.status == 200)
                        fn(that.distillData());
                    else alert("failure");
            }
        that.oAjax.open(that.options.method, that.options.url, that.options.async);
        that.oAjax.send(that.options.data);
    }
    private configOAjax() {
        if (window["XMLHttpRequest"]) this.oAjax = new XMLHttpRequest();
        else this.oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //为兼容IE6
    }
    private distillData(): any {
        let type:string;
        try{
            type= this.oAjax.getResponseHeader("Content-Type")
        }
        catch(e){
            console.log(e);
        }
        if (type.indexOf("application/json;")!=-1)
            return JSON.parse(this.oAjax.responseText);
        else
            return this.oAjax.responseText;
    }
}
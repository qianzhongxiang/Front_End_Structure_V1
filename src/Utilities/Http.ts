import { Extend } from './Extend';
// enum ContentType{  //vs 2017 ts 15.4 中不可指定string 类型enum
//     json = "application/json"
//     // "form"="multipart/form-data; charset=utf-8; boundary=something"
// }
abstract class ContentType {
    static readonly json = "application/json; charset=utf-8"
    static readonly form = "application/x-www-form-urlencoded"
    static readonly formMulti = "multipart/form-data; charset=utf-8; boundary=something"
}

export interface AjaxOptions {
    url: string
    data?: any
    async?: boolean
    method?: string
    contentType?: "json" | "form"
}

/**
 * 
 */
export class Ajax {
    private oAjax: XMLHttpRequest
    constructor(public options: AjaxOptions) {
        this.options = Extend({ async: true, method: "POST", contentType: "form" }, this.options)
        this.configOAjax()
    }
    done(fn?: (data: any, code?: number, oAjax?: XMLHttpRequest) => void, err?: (code: number, oAjax?: XMLHttpRequest) => void) {
        this.oAjax.onreadystatechange = () => {
            if (this.oAjax.readyState == 4)
                if (this.oAjax.status >= 200 && this.oAjax.status < 300)
                    fn && fn(this.distillData(), this.oAjax.status, this.oAjax);
                else err && err(this.oAjax.status, this.oAjax);
        }
        this.oAjax.open(this.options.method, this.options.url, this.options.async);

        if (ContentType[this.options.contentType]) this.oAjax.setRequestHeader("Content-Type", ContentType[this.options.contentType]);
        this.oAjax.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8");
        this.oAjax.send(this.PostDataConvert(this.options.contentType, this.options.data));
    }
    private PostDataConvert(type: string, data: any): any {
        if (!data) return data;
        let res
        switch (type) {
            case "json":
                if (typeof data === "string") { res = data; break; }
                res = JSON.stringify(data)
                break;
            case "form":
                if (typeof data === "object") {
                    let array = [];
                    for (let n in data) {
                        if ((data as Object).hasOwnProperty(n))
                            array.push(n + "=" + data[n].toString());
                    }
                    res = array.join("&");
                } else
                    res = data;
                break;
            case "formMulti":
                if (data instanceof FormData) { res = data; break; }
                res = new FormData();
                if (typeof data === "string") {
                    data.split("&").forEach(item => {
                        let i = item.split("=")
                        res.append(i[0], i[1])
                    })
                }
                else if (typeof data === "object") {
                    for (let n in data) {
                        if ((data as Object).hasOwnProperty(n))
                            res.append(n, (typeof data[n] === "string") ? data[n] : JSON.stringify(data[n]))
                    }
                }

                break;
            default:
                break;
        }
        return res;
    }
    private configOAjax() {
        if (window["XMLHttpRequest"]) this.oAjax = new XMLHttpRequest();
        else this.oAjax = new ActiveXObject("Microsoft.XMLHTTP"); //为兼容IE6
    }
    private distillData(): any {
        let type: string;
        try {
            type = this.oAjax.getResponseHeader("Content-Type")
        }
        catch (e) {
            console.log(e);
        }
        if (type.indexOf("application/json;") != -1)
            return JSON.parse(this.oAjax.responseText);
        else
            return this.oAjax.responseText;
    }
}

export class HttpRequestHeaderBuilder {
    private header: HeadersInit = {}
    WithJson() {
        this.header['content-type'] = 'application/json';
        return this;
    }
    Build(): HeadersInit {
        return this.header;
    }
}
/**
 * HttpRequestConfigBuilder  HttpRequest初始参数构造器
 */
export class HttpRequestConfigBuilder {
    private config: RequestInit = {};
    private headersBuilder: HttpRequestHeaderBuilder;
    constructor() {
        this.headersBuilder = new HttpRequestHeaderBuilder();
    }
    /**
     * WithCors : using cors with mode, 'same-origin' without invoking this method
     * 启动跨域： 使用参数传递的模式进行跨域。未调用该方法则是same-origin
     * 【注】隐私信息不会受影响，使用WithCredentials（）设置隐私信息传递方式
     * @param mode 跨域模式 ，默认使用‘cors’模式 , by default is 'cors'
     */
    WithCors(mode?: RequestMode) {
        this.config.mode = mode || 'cors';
        return this;
    }
    /**
     * WithCredentials : request with Credentials,  'omit' without invoking this method
     * 启用隐私上传： cookie 等信息,未调用则默认是omit
     * @param credentials 隐私信息上传方式, by default is 'same-origin'
     */
    WithCredentials(credentials?: RequestCredentials) {
        this.config.credentials = credentials || 'same-origin';
        return this;
    }
    /**
     * WithJson: using json object as request body
     * @param body can be `string` or {object}
     */
    WithJson(body: object | string) {
        this.config.body = JSON.stringify(body);
        this.headersBuilder.WithJson();
        return this;
    }
    /**
     * WithFormData: headers will filled up automatically
     * @param body {FormData}
     */
    WithFormData(body: FormData) {
        this.config.body = body;
        return this;
    }

    /**
     * 生成初始化参数 for HttpClient.Request method
     */
    Build(): RequestInit {
        this.config.headers = this.headersBuilder.Build();
        return this.config;
    }

    /**
     * Set Post Method; 'Get' without invoking this method, By Defined
     */
    Post() {
        this.config.method = 'POST';
        return this;
    }
    /**
     * 获取默认参数生成器： 'post'; 'same-origin credentials'; 'cors'
     */
    DefaultBuilder() {
        this.Post().WithCors().WithCredentials();
        return this;
    }
}

/**
 * 
 */
export class HttpClient {
    Request(requestTarget: RequestInfo, config?: RequestInit): Promise<{ data: any, response: Response }> {
        return fetch(requestTarget, config).then(response => { return { data: this.ResolveData(response), response: response } });
    }
    private ResolveData(response: Response): Promise<any> {
        const contentType = response.headers.get('content-type');
        switch (contentType) {
            case 'application/json':
                return response.json();
            default:
                return response.text();
        }
    }
}
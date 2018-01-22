export interface Options {
    url: string;
    data?: any;
    async?: boolean;
    method?: string;
    contentType?: "json" | "form";
}
export declare class Ajax {
    options: Options;
    private oAjax;
    constructor(options: Options);
    done(fn?: (data: any, code?: number, oAjax?: XMLHttpRequest) => void, err?: (code: number, oAjax?: XMLHttpRequest) => void): void;
    private PostDataConvert(type, data);
    private configOAjax();
    private distillData();
}

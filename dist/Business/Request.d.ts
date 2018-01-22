import { Options as AjaxOpts } from "../scripts/Utilities/Ajax";
export interface Options extends AjaxOpts {
    onError?: (msg?: string, code?: number) => void;
    onSuccess?: (data?: any) => void;
}
export declare let Post: (options: Options) => void;

import { DataSource } from './../Utilities/DataSource';
export interface IMenuData {
    title?: string;
    url?: string;
    id?: string;
    children?: Array<IMenuData>;
}
/**
 * 最多两级菜单
 */
export declare class Nav {
    Element: HTMLElement;
    options: {
        dataSource: DataSource;
        brand: string;
        brandUrl?: string;
        target?: HTMLIFrameElement;
    };
    private NavElement;
    /**
     *
     * @param Element body is proposed
     * @param options
     */
    constructor(Element: HTMLElement, options: {
        dataSource: DataSource;
        brand: string;
        brandUrl?: string;
        target?: HTMLIFrameElement;
    });
    private GenerateNav(brand, data);
    private GenerateUL(data);
    private GenerateSubDDL(data);
    SetCurrentUser(options: IMenuData, onclick?: (e: MouseEvent) => void): void;
}

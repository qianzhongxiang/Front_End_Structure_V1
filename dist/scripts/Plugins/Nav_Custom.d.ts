import { DataSource } from "../Utilities/DataSource";
export declare abstract class Layout {
    element: HTMLElement;
    private layoutDivs;
    constructor(element: HTMLElement);
    protected initLayout(): void;
    protected layoutInster(index: number, div: {
        id: string;
        attribute?: Object;
        css?: Object;
        "classes"?: string[];
    } | HTMLDivElement, autoHeight?: boolean): HTMLDivElement;
    protected layoutAppend(div: {
        id: string;
        attribute?: Object;
        css?: Object;
        "classes"?: string[];
    } | HTMLDivElement, autoHeight?: boolean): HTMLDivElement;
    protected layoutSetHeight(): void;
}
export declare class MenuItem {
    dataItem: IMenuData;
    private selected;
    width: number;
    element: HTMLDivElement;
    children: Array<MenuItem>;
    parent: MenuItem;
    deep: number;
    constructor(dataItem: IMenuData, selected: ({sender: MenuItem}) => void, width?: number);
    add(dataItem: IMenuData): void;
    remove(): void;
    build(): HTMLDivElement;
    protected selectEvent(): void;
    processByDeep(fn: (e: {
        sender: MenuItem;
    }) => void, deep: number): void;
}
export interface IMenuData {
    title?: string;
    url?: string;
    id?: string;
    children?: Array<IMenuData>;
}
export declare class Menu {
    element: HTMLDivElement;
    options: {
        dataSource: DataSource | Array<any>;
        secContainer: HTMLDivElement;
        vertical?: boolean;
        userInfo?: {
            name: string;
            dataSource: Array<IMenuData>;
        };
    };
    dataSource: DataSource;
    private menuItems;
    private menuElement;
    private suprMore;
    private secMore;
    private userInfo;
    private winResizeEvent;
    click: (e: {
        sender: MenuItem;
    }) => void;
    constructor(element: HTMLDivElement, options: {
        dataSource: DataSource | Array<any>;
        secContainer: HTMLDivElement;
        vertical?: boolean;
        userInfo?: {
            name: string;
            dataSource: Array<IMenuData>;
        };
    });
    private build();
    initUserInfo(userInfo: {
        name: string;
        dataSource: Array<IMenuData & {
            click?: ({sender: MenuItem}) => void;
        }>;
    }, reDecorateMenu?: boolean): void;
    private selectedMothed(e);
    private leafClick(e);
    private showSecItems(e);
    private decorate(element, items, more);
    Destroy(): void;
}
export declare class TabPageItem {
    private title;
    private url;
    id: string;
    private iframeContainer;
    tabElement: HTMLDivElement;
    iframe: HTMLIFrameElement;
    tabPage: TabPage;
    constructor(title: string, url: string, id: string, iframeContainer: HTMLDivElement);
    build(): HTMLDivElement;
    private _click(e?);
    click(): void;
    distory(): void;
}
export declare class TabPage {
    private element;
    private tpItems;
    private tabsDiv;
    private iframeContainer;
    private tcLBtn;
    private tcrBtn;
    constructor(element: HTMLDivElement);
    private build();
    /**
     * 主要实现leftMove rightMove
     */
    private decorate();
    add(item: {
        title: string;
        url: string;
        id: string;
    }): TabPageItem;
    selectedMothed(e: {
        sender: TabPageItem;
    }): void;
    remove(id: string): void;
    tcLBtn_clik(): void;
    tcrBtn_clik(): void;
    TabCount(): number;
}
export declare class MainPageLayout extends Layout {
    protected superMenu: HTMLDivElement;
    protected secondMenu: HTMLDivElement;
    protected content: HTMLDivElement;
    constructor(element: HTMLElement);
    protected initLayout(): void;
}
export declare class MainPage extends MainPageLayout {
    options: {
        data: DataSource;
    };
    protected menu: Menu;
    protected page: TabPage;
    protected superMenu_Menu: any;
    protected TabCount: number;
    constructor(element: HTMLElement, options: {
        data: DataSource;
    });
    private initMenu();
    private initPages();
    private UserInfoOperate(sender);
    InitUserInfo(info: {
        name: string;
        dataSource: Array<IMenuData>;
    }): void;
}

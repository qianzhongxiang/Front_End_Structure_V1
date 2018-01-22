export declare class LNode {
    Data: any;
    Next: LNode;
}
export declare class LinkList<T extends LNode> {
    Id: string;
    private HeadNode;
    private EndHandle;
    constructor();
    Count(): number;
    Add(node: T): T;
    Get_ByFn(fn: (node: T) => boolean): T[];
    Get_ByData(data: any): T;
    Del_ByData(data: any): T;
    Del_ByFn(fn: (node: T) => boolean): T[];
    /**
     * return index of special data beginning from 0
     * @param data
     */
    IndexOf(data: any): number;
    Insert(index: number, inNode: T): T;
    ForEach(fn: (node: T) => void): void;
}
